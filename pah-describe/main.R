library(tidyverse)
df0 <- read_csv("./data/没有中文字符的数据.csv") # 带有type0的数据
df_name <- read_csv("./data/新-变量注解.csv") |> filter(!is.na(Variable))
df <- df0 |> filter(X1 %in% c("1", "2")) # 有分娩结局



# 2分类;
df_outcome <- df |>
    select(
        V10,
        V12,
        V13,
        V14,
        V15,
        V16,
        V18,
        V17,
        V19,
        V44,
        V46,
        V101,
        V102,
        V103,
        V104,
        V105,
        V107,
        V109,
        V110,
        V118,
        V123,
    )


df_outcome_summary <- df_outcome |>
    # 转换为长数据
    pivot_longer(
        cols = everything(),
        names_to = "variable",
        values_to = "value"
    ) |>
    group_by(variable) |>

    # 计算统计摘要
    summarise(
        n = n(),
        `1(%)` = glue(
            " {sum(value == '1', na.rm = TRUE)} ({round(mean(value == '1', na.rm = TRUE)*100, 2)}%)"
        ),
        `0(%)` = glue(
            " {sum(value == '0', na.rm = TRUE)} ({round(mean(value == '0', na.rm = TRUE)*100, 2)}%)"
        ),
        `NA` = sum(is.na(value)),
    ) |>
    left_join(df_name, join_by(variable == Variable))  # 添加变量注解
    # 展示统计结果

knitr::kable(
    df_outcome_summary |> select(Label, `0(%)`, `1(%)`, `NA`),
    caption = glue("妊娠结局统计摘要 (n = {nrow(df_outcome)})")
)


# 不良结局
df_bad <- df |>
    select(
        V11,
        V2,
        V3,
        V4,
        V5,
        V6,
        V7,
        V8,
        V10,
        V119
    )


library(glue)
df_bad_summary <- df_bad |>
    # 转换为长数据
    pivot_longer(
        cols = everything(),
        names_to = "variable",
        values_to = "value"
    ) |>
    group_by(variable) |>

    # 计算统计摘要
    summarise(
        n = n(),
        `1(%)` = glue(
            " {sum(value == '1')} ({round(mean((value == '1'))*100, 2)}%)"
        ),
        `0(%)` = glue(
            " {sum(value == '0')} ({round(mean((value == '0'))*100, 2)}%)"
        )
    ) |>

    left_join(df_name, join_by(variable == Variable)) |> # 添加变量注解
    select(Label, `0(%)`, `1(%)`) # 展示统计结果
knitr::kable(
    df_bad_summary,
    caption = glue("不良事件统计摘要（n = {nrow(df_bad)})")
)
