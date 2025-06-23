library(tidyverse)
library(glue)
library(knitr)

df_name <- read_csv("./data/新-变量注解.csv") |> filter(!is.na(Variable)) # 变量注解文件
df0 <- read_csv("./data/没有中文字符的数据-有变量名.csv") # 带有type0的数据
df <- df0 |> filter(type %in% c("1", "2")) # 有分娩结局


df_surgery1 <- df |>
    filter(
        V70 == 1 | V71 == 1 | V72 == 1
    )

df_surgery0 <- df |>
    filter(
        (V48 == 1 | V49 == 1 | V50 == 1), # 先心病
        V70 == 0,
        V71 == 0,
        V72 == 0,
    )

# 术后

# 转化为长数据,即抽离出week
df_surgery1_long <- df_surgery1 |>
    pivot_longer(
        cols = matches("_(孕前|孕早期|孕中期|孕晚期|产后10天内|产后8周内)$"),
        names_to = c(".value", "week"),
        names_pattern = "(.+)_(.+)",
        values_drop_na = FALSE
    ) |>
    mutate(
        `week` = week,
        `SPAP` = SPAP,
        `TRV` = TRV,
        `TAPSE` = TAPSE,
        `ln(BNP)` = log(B型钠酸肽),
        `右室前后径` = 超声前后径,
        `右室流出道` = 超声流出道,
        `左室舒末内径` = 超声舒末内径,
        `肺动脉主干径` = 超声主干径,
        `右房面积` = 超声右房,
        `右室面积` = 超声前后径 * 超声流出道,
        .keep = 'none'
    )


# 封装绘图函数
violin_box <- function(df_surgery1_long, y) {
  ggplot(df_surgery1_long, aes(x = week, y = {{ y }})) +
    geom_violin(aes(fill = week), alpha = 0.8) +
    geom_boxplot(width = 0.2, outlier.shape = NA) +
    geom_point(
      size = 0.5,
      alpha = 0.5,
      position = position_jitter(width = 0.15)
    ) +
    stat_summary(
      fun = median,
      geom = "line",
      aes(group = 1),
      color = "red",
      linewidth = 0.5,
      linetype = 5
    ) +
    theme_classic() + 
    theme(legend.position = "none")
}

p1_SPAP <- violin_box(df_surgery1_long, SPAP)
p1_TRV <- violin_box(df_surgery1_long, TRV)
p1_TAPSE <- violin_box(df_surgery1_long, TAPSE)
p1_ln_BNP <- violin_box(df_surgery1_long, `ln(BNP)`)
p1_右室前后径 <- violin_box(df_surgery1_long, `右室前后径`)
p1_右室流出道 <- violin_box(df_surgery1_long, `右室流出道`)
p1_左室舒末内径 <- violin_box(df_surgery1_long, `左室舒末内径`)
p1_肺动脉主干径 <- violin_box(df_surgery1_long, `肺动脉主干径`)
p1_右房面积 <- violin_box(df_surgery1_long, `右房面积`)
p1_右室面积 <- violin_box(df_surgery1_long, `右室面积`)

# 将所有图形组合成2列5行的布局
combined_plot <- grid.arrange(
    p1_SPAP, p1_TRV, p1_TAPSE, p1_ln_BNP,
    p1_右室前后径, p1_右室流出道, p1_左室舒末内径, p1_肺动脉主干径,
    p1_右房面积, p1_右室面积,
  ncol = 2, # 设置为2列
  nrow = 5 # 设置为5行
)

# 保存图形
ggsave("小提琴-术后82.png", combined_plot, width = 10, height = 20)
