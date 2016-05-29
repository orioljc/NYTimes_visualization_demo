# set working directory
setwd("~/Dropbox/aaaaUCI/topic_modeling/visualization/NYTimes_modeling_demo/oriol_nyt/data/csv_files")

data <- read.csv("it100.csv")
names(data) <- c('crime', 'economy', 'education', 'online', 'sports')

data[1:50,3:22] <- matrix(runif(1000),50,20)
  
  
  # name group column
  colnames(data$crime) <- c("group", "topic 1", "topic 2", "topic 3", "topic 4", "topic 5", "topic 6", "topic 7", "topic 8", "topic 9", "topic 10", "topic 11", "topic 12", "topic 13", "topic 14", "topic 15", "topic 16", "topic 17", "topic 18", "topic 19", "topic 20")
  colnames(data$economy) <- c("group", "topic 1", "topic 2", "topic 3", "topic 4", "topic 5", "topic 6", "topic 7", "topic 8", "topic 9", "topic 10", "topic 11", "topic 12", "topic 13", "topic 14", "topic 15", "topic 16", "topic 17", "topic 18", "topic 19", "topic 20")
  colnames(data$education) <- c("group", "topic 1", "topic 2", "topic 3", "topic 4", "topic 5", "topic 6", "topic 7", "topic 8", "topic 9", "topic 10", "topic 11", "topic 12", "topic 13", "topic 14", "topic 15", "topic 16", "topic 17", "topic 18", "topic 19", "topic 20")
  colnames(data$online) <- c("group", "topic 1", "topic 2", "topic 3", "topic 4", "topic 5", "topic 6", "topic 7", "topic 8", "topic 9", "topic 10", "topic 11", "topic 12", "topic 13", "topic 14", "topic 15", "topic 16", "topic 17", "topic 18", "topic 19", "topic 20")
  colnames(data$sports) <- c("group", "topic 1", "topic 2", "topic 3", "topic 4", "topic 5", "topic 6", "topic 7", "topic 8", "topic 9", "topic 10", "topic 11", "topic 12", "topic 13", "topic 14", "topic 15", "topic 16", "topic 17", "topic 18", "topic 19", "topic 20")
  
  row.names(data$crime) <- c("floor", "prosecutor", "police", "defendant", "restaurant", "chef", "investigator", "witness", "zzz_phil_jackson", "witnesses")
  row.names(data$economy) <- c("percent", "market", "growth", "economy", "rate", "rates", "economist", "poll", "survey", "companies")
  row.names(data$education) <- c("children", "reading", "campus", "learn", "prayer", "application", "literature", "deaf", "learning", "textbook")
  row.names(data$online) <- c("com", "information", "www", "zzz_eastern", "commentary", "web", "business", "separate", "marked", "holiday")
  row.names(data$sports) <- c("game", "ball", "guy", "run", "allowed", "threw", "throw", "left", "play", "starter")
  
  data_all <- data.frame()
  data_all <- rbind(data_all, data$crime)
  data_all <- rbind(data_all, data$economy)
  data_all <- rbind(data_all, data$education)
  data_all <- rbind(data_all, data$online)
  data_all <- rbind(data_all, data$sports)
  
  row_names <- row.names(data_all)
  row_names <- c(row_names, "")
  
  # add hack to rescale axis
  foo <- data.frame( rep(1,21) )
  foo[1,] <- ""
  foo <- t(foo)
  colnames(foo) <- c("group", "topic 1", "topic 2", "topic 3", "topic 4", "topic 5", "topic 6", "topic 7", "topic 8", "topic 9", "topic 10", "topic 11", "topic 12", "topic 13", "topic 14", "topic 15", "topic 16", "topic 17", "topic 18", "topic 19", "topic 20")
  data_all <- rbind(data_all, foo )
  row.names(data_all) <- row_names
  
  
  # save only 4 digits of each number
  
  data_all[,-1] <- sapply(data_all[,-1], as.numeric)
  data_all[,-1] <- sapply(data_all[,-1], round, digits = 3)
  
  name_of_file_CSV <- "it0.csv"
  
  write.csv(data_all, paste("csv_files/", name_of_file_CSV, sep="") )

