library(RPostgreSQL)
library(jsonlite)
library(plumber)

# Define database connection function
db_conn <- function() {
  db_path <-"E:/BasicWeb/dataPrj.db"
  con <- dbConnect(RSQLite::SQLite(), dbname = db_path)
  return(con)
}

#' @filter cors
cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
}

# Define SQL queries
CREATE_TABLE <- "
                CREATE TABLE IF NOT EXISTS students (
                id VARCHAR(20) PRIMARY KEY, name VARCHAR(100), email VARCHAR(50), date TIMESTAMP, score Integer ,locate VARCHAR(50) ,MSSV VARCHAR(20)
                );
                "
SELECT <- "SELECT * FROM students;"
INSERT <- "INSERT INTO students (name, date, mssv, email, score, locate) VALUES ( ?, ?, ?, ?, ?, ?);"
UPDATE <- "UPDATE students SET name = ?, date = ?, mssv = ?, email = ?, score = ?, locate = ? WHERE id = ? ;"
DELETE <- "DELETE FROM students WHERE id = ?;"

# Define plumber API endpoints
#* @apiTitle Student API
#* @get /students
Show_students <- function(){
  conn <- db_conn()
  data <- dbGetQuery(conn, SELECT)
  dbDisconnect(conn)
  return(data)
}

#* @post /students
post_example <- function(name, date, mssv, email, score, locate) {
  
  # Connect to the database
  conn = db_conn()
  dbExecute(conn, INSERT, list(name, date, mssv, email, score, locate))
  
  # Disconnect from the database
  dbDisconnect(conn)
  
  # Return a response
  return("Done!")
}

#* @put /students
put_example <- function( name, date, mssv, email, score, locate,id) {
  # Connect to the database
  conn = db_conn()
  dbExecute(conn, UPDATE, list(name, date, mssv, email, score, locate,id))
  
  # Disconnect from the database
  dbDisconnect(conn)
  
  # Return a response
  return("Done!")
}

#* @delete  /students/<id:int>
delete_example <- function(id) {
  
  # Connect to the database
  conn = db_conn()
  dbExecute(conn, DELETE, id)
  
  # Disconnect from the database
  dbDisconnect(conn)
  
  # Return a response
  return("Done!")
}
