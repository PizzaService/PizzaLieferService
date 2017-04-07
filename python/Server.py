import http.server
import RequestHandler

PORT = 80

HandlerClass = RequestHandler.RequestHandler
ServerClass = http.server.HTTPServer

mainServer = ServerClass(("",PORT),HandlerClass)
mainServer.serve_forever()
