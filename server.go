package main
import ( "log"; "net/http" )
func main() {
    fs := http.FileServer(http.Dir("."))
    http.Handle("/", fs)
    log.Println("🚀 Сервер қосылды: http://localhost:8081")
    http.ListenAndServe(":8081", nil)
}
