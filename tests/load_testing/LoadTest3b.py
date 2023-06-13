
import os
import json
from locust import HttpUser, between, task
from locust.env import Environment
# import invokust


    
class WebsiteUser(HttpUser):
    wait_time = between(2, 5)
    host = "127.0.0.1"
    
    def on_start(self):
        with self.client.post("https://portalapi.dtechtive.com/v1/users/signin", json={
          "email": "a@a.com", 
          "password": "pass"
        },
        catch_response = True) as response:

            data = json.loads(response.text)
            token = data["token"]
            self.client.headers = {
                "Authorization": "Bearer " + token,
                "X-API-Key": "qN/VcEUtCwEuIxWWq93UrVOiiXJfMGdoUz9hMtclGDJhW4GJWezD5xsnAMNR" # actually used only on https://api.dtechtive.com/completion/ requests
            }
            print("token: " + token)

        #/ with self.client.post() as response:
    
#Login

    #Request URL: https://dtechtive.com/login
    #Request Method: GET

    #Request URL: https://portalapi.dtechtive.com/v1/users/signin
    #Request Method: POST
    #{email: "a@a.com", password: "pass"}

    #Request URL: https://portalapi.dtechtive.com/v1/user-bookmarks/userlistitems
    #Request Method: GET

    #Request URL: https://portalapi.dtechtive.com/v1/notifications/
    #Request Method: GET

    #Request URL: https://api.dtechtive.com/v4/data_view/%7Bids%7D?li=142&li=193&li=194&li=65&
    #Request Method: GET

    @task
    def index(self):
        self.client.get("https://dtechtive.com/login")
        self.client.get("https://portalapi.dtechtive.com/v1/user-bookmarks/userlistitems")
        self.client.get("https://portalapi.dtechtive.com/v1/notifications/")
        self.client.get("https://api.dtechtive.com/v4/data_view/%7Bids%7D?li=142&li=193&li=194&li=65&")
        
#My Workspace

    #Request URL: https://portalapi.dtechtive.com/v1/users/favourites_providers
    #Request Method: GET

    #Request URL: https://portalapi.dtechtive.com/v1/users/favourites_datasets
    #Request Method: GET

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #Request Method: POST
    #{"meta_dataset_ids":[1,7,27,65,142,168,191,193,194,864,1149,1150,1156]}

    @task
    def workspace(self):
        self.client.get("https://portalapi.dtechtive.com/v1/users/favourites_datasets")
        self.client.get("https://portalapi.dtechtive.com/v1/users/favourites_providers")

        self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
          "meta_dataset_ids":[142,1758,191,864,1,1150,1156,194,168,1149,193,65,7,27,1447]
        })
        
#Search writing?

    #Request URL: https://api.dtechtive.com/completion/reserve
    #Request Method: GET
    #x5 ?

    @task
    def write_search(self):
        self.client.get("https://api.dtechtive.com/completion/res")
        self.client.get("https://api.dtechtive.com/completion/reser")
        self.client.get("https://api.dtechtive.com/completion/reserve")
        
#Search query

    #Request URL: https://api.dtechtive.com/v4/datasets/?search_query=reserve&page_size=20&page_num=1&sort_by=relevance
    #Request Method: GET

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #Request Method: POST
    #{"meta_dataset_ids":[137,146,982,1148,1415,1149,1135,1412,136,1416,1417,1414,141,1411,1413,1418,397,1134,1199,443]}

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/displays
    #Request Method: POST
    #{"meta_dataset_ids":[137,146,982,1148,1415,1149,1135,1412,136,1416,1417,1414,141,1411,1413,1418,397,1134,1199,443]}

    #Request URL: https://api.dtechtive.com/completion/reserve
    #Request Method: GET

    #Request URL: https://portalapi.dtechtive.com/v1/notifications/
    #Request Method: GET

    @task
    def search(self):
        self.client.get("https://api.dtechtive.com/v4/datasets/?search_query=reserve&page_size=20&page_num=1&sort_by=relevance")

        self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
          "meta_dataset_ids":[2,11,1126,1292,213,1293,1279,1,210,214,215,6,212,209,211,216,541,1343,1278,587]
        })
        self.client.post("https://portalapi.dtechtive.com/v1/datasets/displays", json={
          "meta_dataset_ids":[2,11,1126,1292,213,1293,1279,1,210,214,215,6,212,209,211,216,541,1343,1278,587]
        })

        self.client.get("https://api.dtechtive.com/completion/reserve")

        # self.client.get("https://portalapi.dtechtive.com/v1/notifications/")
        
#Domains: Geography

    #Request URL: https://api.dtechtive.com/v4/datasets/?search_query=reserve&page_size=20&page_num=1&sort_by=relevance&domains=Geography
    #Request Method: GET

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #Request Method: POST
    #{"meta_dataset_ids":[787, 913, 1347, 1343, 1345, 549, 985, 1551]}

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/displays
    #Request Method: POST
    #{"meta_dataset_ids":[787, 913, 1347, 1343, 1345, 549, 985, 1551]}

    @task
    def geography(self):
        self.client.get("https://api.dtechtive.com/v4/datasets/?search_query=reserve&page_size=20&page_num=1&sort_by=relevance&domains=Geography")

        self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
          "meta_dataset_ids":[931,1057,2922,3475,145,141,143,693,1129,349]
        })
        self.client.post("https://portalapi.dtechtive.com/v1/datasets/displays", json={
          "meta_dataset_ids":[931,1057,2922,3475,145,141,143,693,1129,349]
        })
        
#!!! Montgomeryshire Wildlife Trust species records collated and digitised by BIS

    #Request URL: https://api.dtechtive.com/v4/datasets/931
    #Request Method: GET

    #-Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #-Request Method: GET
    #-(slow)

    #-Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #-Request Method: GET
    #-(slow)

    #Request URL: https://portalapi.dtechtive.com/v1/notifications/
    #Request Method: GET

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #Request Method: POST
    #{"meta_dataset_ids":[931]}

    #-Request URL: https://portalapi.dtechtive.com/v1/datasets/931/is_usecase_feedback_given
    #-Request Method: GET

    #-Request URL: https://portalapi.dtechtive.com/v1/metrics/dataset/931/by_time?from_date=2023-03-16&to_date=2023-03-16
    #-Request Method: GET

    #-Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #-Request Method: POST
    #-{"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/931/views
    #Request Method: POST
    #{}

    #-Request URL: https://portalapi.dtechtive.com/v1/datasets/931/is_quality_feedback_given
    #-Request Method: GET

    #-Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #-Request Method: POST
    #-{"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    @task
    def dataset(self):
        self.client.get("https://api.dtechtive.com/v4/datasets/931")
        # self.client.get("https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931")
        # self.client.get("https://api.dtechtive.com/v5/datasets/related-by-description/931")

        # self.client.get("https://portalapi.dtechtive.com/v1/notifications/")
        
        self.client.post("https://portalapi.dtechtive.com/v1/datasets/931/views", json={
        })

        self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
          "meta_dataset_ids":[931]
        })
        # self.client.get("https://portalapi.dtechtive.com/v1/datasets/931/is_usecase_feedback_given")
        # self.client.get("https://portalapi.dtechtive.com/v1/metrics/dataset/931/by_time?from_date=2023-03-16&to_date=2023-03-16")

        #self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
        #  "meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]
        #})
        #self.client.get("https://portalapi.dtechtive.com/v1/datasets/931/is_quality_feedback_given")

        #self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
        #  "meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]
        #})
        
#Insights

    #Request URL: https://portalapi.dtechtive.com/v1/metrics/dataset/931/by_time?from_date=2023-03-16&to_date=2023-03-16
    #Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET
    #- (slow)

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET
    #- (slow)

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/quality_metric/931
    #Request Method: GET

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/notifications/
    #- Request Method: GET

    @task
    def insights(self):
        self.client.get("https://portalapi.dtechtive.com/v1/metrics/dataset/931/by_time?from_date=2023-04-14&to_date=2023-04-14")
        self.client.get("https://portalapi.dtechtive.com/v1/datasets/quality_metric/931")
        
#Insights - Use cases

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET
    #- (slow)

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET
    #- (slow)

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/usecase_metric/931
    #Request Method: GET

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    @task
    def insights_usecases(self):
        self.client.get("https://portalapi.dtechtive.com/v1/datasets/usecase_metric/931")
        
#Insights - Download Metrics

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    #Request URL: https://portalapi.dtechtive.com/v1/metrics/get_dataset_metrics/931
    #Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET
    #- (slow)

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET
    #- (slow)

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    @task
    def insights_downloadmetrics(self):
        self.client.get("https://portalapi.dtechtive.com/v1/metrics/get_dataset_metrics/931")

        # self.client.get("https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931")
        # self.client.get("https://api.dtechtive.com/v5/datasets/related-by-description/931")

        #self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
        #  "meta_dataset_ids":[269, 687, 748, 819, 913, 196, 193, 174, 157, 163]
        #})
        #self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
        #  "meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]
        #})
        
#Related datasets

    #Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #Request Method: GET
    #(slow)

    #Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #Request Method: GET
    #(slow)

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #Request Method: POST
    #{"meta_dataset_ids":[269, 687, 748, 819, 913, 196, 193, 174, 157, 163]}

    #Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #Request Method: POST
    #{"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    #- If I keep the page open it keeps reloading the queries periodically

    @task
    def related_datasets(self):
        self.client.get("https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931")
        self.client.get("https://api.dtechtive.com/v5/datasets/related-by-description/931")

        self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
          "meta_dataset_ids":[1057,506,1279,1415,996,784,1292,1293,541,1184]
        })

        self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
          "meta_dataset_ids":[963,892,831,413,1057,1290,947,32,61,22]
        })

#Related datasets - related by description

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    #- Request URL: https://portalapi.dtechtive.com/v1/notifications/
    #- Request Method: GET
        
    #@task
    #def related_by_description(self):
    #  pass

#Data files

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    @task
    def data_files(self):
        pass
        
#Download
    #!!! download does not actually happen

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET

    #Request URL: https://portalapi.dtechtive.com/v1/notifications/feedback_request
    #Request Method: POST
    #{"dataset_id":787,"title":"Montgomeryshire Wildlife Trust records held by BIS","type":""}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-domains-and-topics/931
    #- Request Method: GET

    #- Request URL: https://api.dtechtive.com/v5/datasets/related-by-description/931
    #- Request Method: GET

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[1784,1783,349,841,1140,1802,1812,1810,1807,1781]}

    #- Request URL: https://portalapi.dtechtive.com/v1/datasets/stats
    #- Request Method: POST
    #- {"meta_dataset_ids":[913, 362, 1135, 1271, 852, 640, 1148, 1149, 397, 1040]}

    @task
    def download(self):
        self.client.post("https://portalapi.dtechtive.com/v1/notifications/feedback_request", json={
          "dataset_id":931,
          "title":"Montgomeryshire Wildlife Trust records held by BIS",
          "type":""
        })





if __name__ == "__main__":

    # os.environ['LOCUST_WEB_HOST'] = "127.0.0.1"
    # os.environ['LOCUST_WEB_PORT'] = "8300"    # NB! needs to be str
    os.environ['LOCUST_PRINT_STATS'] = "true"
    os.environ['LOCUST_AUTOSTART'] = "true"

    # os.environ['LOCUST_USERS'] = "1"
    # os.environ['LOCUST_RUN_TIME'] = "10s"
    # os.environ['LOCUST_SPAWN_RATE'] = "1"
    # os.environ['LOCUST_HOST'] = "127.0.0.1"


    my_env = Environment(user_classes=[WebsiteUser])
    WebsiteUser(my_env).run()


































































































































