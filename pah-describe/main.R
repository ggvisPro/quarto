library(tidyverse)
library(glue)
library(knitr)
df0 <- read_csv("./data/没有中文字符的数据.csv") # 带有type0的数据
df_name <- read_csv("./data/新-变量注解.csv") |> filter(!is.na(Variable))
df <- df0 |> filter(X1 %in% c("1", "2")) # 有分娩结局

df <- df[,cols_to_select]

# 超声及抽血检查

cols_to_select <- paste0("X", seq(3, 763, by = 6))

# 选择存在的列
existing_cols <- intersect(cols_to_select, names(df))
df_selected <- df[, existing_cols]
