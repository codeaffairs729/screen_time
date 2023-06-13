

Load test instructions:
=======================

* Prepare python setup.
	pip install locust
* Verify that the URLs, POST request payloads, and authorisation headers in the load test script are up to date. For this do the following:
	* Open Chrome
	* Open Chrome Developer Tools
	* In Developer Tools, go to Network tab
	* Configure filters:
		* In the filter text box write "posthog"
		* Check the "Invert" checkbox beside the filter text box
		* Select "Fetch/XHR" and "Doc" resource types, leave rest of types unchecked. Use Ctrl key to select both of these types.
	* Go to https://dtechtive.com/
		* Note down the requests made by the browser and compare them to the requests in the Python load test script. If the requests made by the browser are different then in the script then you need to update the script accordingly.
		* Continue navigating through the website according to the order desired. 
			* The human-form description of current navigation order can be seen at the second half of this document under title "Description of the load test setup".
			* The programmatic description of current navigation order can be seen in the Python script.
			* For clarity, I suggest clearing the request history after checking the requests made during current user journey step, and before executing a new user journey step. This helps you to clearly see which new requests appear after user performs a new journey step.
		* For POST requests pay attention to the payload. When you click on the request, a right panel opens. In that panel are multiple tabs, select a tab titled "Payload". For getting payload in JSON format, click "view source" in the Payload panel.
			* Note that some requests contain an array of numbers. Usually these numbers are stable, but after the DTechtive database is reindexed or something these numbers change. I guess it is then necessary to update the array values in the load test script as well.
			* Example of such request:
				self.client.post("https://portalapi.dtechtive.com/v1/datasets/stats", json={
					"meta_dataset_ids":[142,1758,191,864,1,1150,1156,194,168,1149,193,65,7,27,1447]
				})
			* NB! The above mentioned array values are usually different across the user journey, only some have repeating content. So when you notice a need to update some, then it is likely you may need to individually copy new values from the browser for all these POST requests.
		* Note that https://api.dtechtive.com/completion/ requests have a X-API-Key header. This header needs to have a correct value else the API refuses the request. Check that the header specified in the on_start(self) method in Python script matches what you see in browser for the https://api.dtechtive.com/completion/ requests.
* Open command prompt 
	* Go to the directory where the load test script is located
* Prepare Google and Amazon dashboards
	* The Amazon dashboards are at
		https://eu-west-2.console.aws.amazon.com/ecs/v2/clusters/vespa-app-and-search-api-cluster/services?region=eu-west-2
		* Open both:
			* search-api-service
			* vespa-app-service
	* The Google dashboards are at:
		https://console.cloud.google.com/apis/api/compute.googleapis.com/metrics?project=epsilon1-dev&authuser=1&pageState=(%22duration%22:(%22groupValue%22:%22PT1H%22,%22customValue%22:null))&pli=1
* Run load test sanity check
	* In master.conf set 
		users = 10
		run-time = 10m
	* In the command prompt execute
		locust --locustfile LoadTest3b.py --config master.conf
	* In the browser go to 
		http://localhost:8300/
	* Wait 10 minutes
	* If no errors appear in the dashboards visible in the browser, then the load test script seems to be ready for use.
* Run actual load test
	* Cancel the sanity check script by pressing Ctrl+C. You may need to press Ctrl+C multiple times before Python shuts everything down.
	* Modify the master.conf 
		users = 400
		run-time = 60m
	* spawn-rate setting is the rate of new users per second. With rate of 0.27 it takes about 15 minutes to reach 400 users.
	* In the command prompt execute
		locust --locustfile LoadTest3b.py --config master.conf
	* In the browser go to 
		http://localhost:8300/
	* Monitor plots at http://localhost:8300/
	* When done, take screenshots of Amazon, Google dashboards, as well as the dashboards of the local load test framework (at http://localhost:8300/)




Description of the load test setup:
===================================

Each user went through the following journey. Between each step there is a random 2 - 5 second delay to simulate user thinking (which also reduces server load correspondingly). For implementing the load test I used Locust library.

* Open the front page
* Log in
* Click on "My workspace" menu
* Write a search with word "reserve". Slowly enough that three sentence completion requests are sent to the server during that
* Do a search
* Click on "Domains" and choose "Geography"
* Click on one Dataset ("Scotland Habitat and Land cover map - 2020" in this experiment)
* Click on "Insights"
* Click on "Use cases" under "Insights"
* Click on "Download metrics" under "Insights"
* Click on "Related datasets" (Actually this step causes no load IF the unnecessary queries are removed from Javascript. During the experiment I assumed they are removed. But I still kept the step in the experiment, which means that the server load was reduced for the duration of this step since it introduced an additional 2-5 sec simulated delay before next step.)
* Skipped click on "Related by description" under "Related datasets" since it causes no load (which means server load was not reduced by simulating this step - instead the user moves right to the "Data files" step)
* Skipped click on "User feedback" since it causes no load (which means server load was not reduced by simulating this step - instead the user moves right to the "Data files" step)
* Skipped click on "Data quality" under "User feedback" since it causes no load (which means server load was not reduced by simulating this step - instead the user moves right to the "Data files" step)
* Click on "Data files" (Actually this step causes no load either. But I still kept the step in the experiment since the user cannot navigate to next step without going through this step in UI. This means that the server load was reduced for the duration of this step since it introduced an additional 2-5 sec simulated delay before next step.)
* Click on "Download" under "Data files"
* Repeat from the beginning (can be interpreted as a new user arriving while previous one leaves)
 
I increased the concurrent user count by one every 30 seconds. At about 100 users I stopped the experiment.

I am attaching the screenshots of the various plots during the experiment. Look at the time period between 23:50 and 00:20. There is also the query performance matrix and error list. The query performance matrix also contains an error count column. NB! The error info is informative to see which API endpoints had most problems and might need optimisation or additional resources in the future.






