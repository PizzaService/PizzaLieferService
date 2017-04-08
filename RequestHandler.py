import urllib
import http.server
import http.cookies
import json
import datetime
import random


class RequestHandler(http.server.SimpleHTTPRequestHandler):

    JSONFILE = "data.json"
    MAX_CLIENTS = 50        # number of simultaneously allowed clients
    COOKIE_LIFESPAN = 900   # in seconds -> cookies(sessions) live for 15 min
    sendcookies = 1         #true
    onlyupdate = 0          #false
    id_of_cookie_to_update = 0
    Cookie_Box = {}
    list_of_Orders = {}

    def do_GET(self):#https://opensource.apple.com/source/python/python-3/python/Lib/SimpleHTTPServer.py

        self.handle_cookies()

        f = self.send_head()
        if f:
            self.copyfile(f, self.wfile)
            f.close()

    def do_POST(self):

        self.handle_cookies()

        # https://stackoverflow.com/questions/2121481/python3-http-server-post-example
        length = int(self.headers['Content-Length'])
        post_data = urllib.parse.parse_qs(self.rfile.read(length).decode('utf-8'))
        # dictionary of the post data

        post_data["ip"] = self.address_string()

        self.list_of_Orders[len(self.list_of_Orders)] = post_data

        self.write_list_to_json(self.list_of_Orders,"data.json")


        f = self.send_head()
        if f:
            self.copyfile(f, self.wfile)
            f.close()

    def write_list_to_json(self,dict,jsonfile):
        # https://stackoverflow.com/questions/7100125/storing-python-dictionaries
        with open(jsonfile, 'w') as jsontemp:
            json.dump(dict, jsontemp, indent=3)

    def read_json_to_list(self,jsonfile):
        with open(jsonfile, 'r') as jsontemp:
            datadict = json.load(jsontemp)
        return datadict

    def end_headers(self):#https://stackoverflow.com/questions/12499171/can-i-set-a-header-with-pythons-simplehttpserver
        self.send_cookies_header()
        http.server.SimpleHTTPRequestHandler.end_headers(self)

    def send_cookies_header(self):
        if self.sendcookies:
            print(self.Cookie_Box)
            id = random.randint(1,1000000000)
            exp = datetime.datetime.now()+datetime.timedelta(seconds=self.COOKIE_LIFESPAN)
            self.Cookie_Box[id] = exp
            self.send_header("Set-Cookie", "id=%s; Max-Age=%s;path=/" % (id,self.COOKIE_LIFESPAN))

        if self.onlyupdate:
            print(self.Cookie_Box)
            self.send_header("Set-Cookie", "id=%s; Max-Age=%s;path=/" % (self.id_of_cookie_to_update, self.COOKIE_LIFESPAN))
            exp = datetime.datetime.now() + datetime.timedelta(seconds=self.COOKIE_LIFESPAN)
            self.Cookie_Box[self.id_of_cookie_to_update] = exp

    def delete_old_cookies(self):
        for key, value in self.Cookie_Box.items():
            if datetime.datetime.now()>value:
                del self.Cookie_Box[key]

    def handle_cookies(self):
        self.sendcookies = 1
        self.onlyupdate = 0
        self.delete_old_cookies()

        if self.headers["cookie"]:
            if self.Cookie_Box.__contains__(int(str(self.headers).split("Cookie: id=")[1].splitlines()[0])):
                self.onlyupdate = 1
                self.sendcookies = 0
                self.id_of_cookie_to_update = int(str(self.headers).split("Cookie: id=")[1].splitlines()[0])
        else:
            if len(self.Cookie_Box) >= self.MAX_CLIENTS:
                self.sendcookies = 0
                self.send_error(503)
                return