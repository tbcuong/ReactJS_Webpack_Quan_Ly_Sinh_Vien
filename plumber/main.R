library(plumber)
# Load your Plumber script
r <- plumb("C:/Users/lifea/Downloads/api.R")
# Run the Plumber API
r$run(debug = TRUE,port = 8000)