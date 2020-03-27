# Search Service

Hello, I'm a micro-service in Node.js. I'm able to look into Goodreads and fetch books.
But I feel a bit limited. Can you help me to improve my skills?

I would like to be able to filter and sort my results. Can you add me this features?
I need to make sure that all data passed to me is correctly validated.

Also I feel a bit naked. Can you add a nice HTML template with a search bar and a list of cards with the results aligned?

You can call this endpoint: ```/api/v1/search?q=book-name``` to fetch books in an Ajax request.

## Starting the service locally as Docker container

- Clone the code into a folder of your choice.
- Make sure you have `docker` installed in your machine.
- Run `bash run.sh` in the root of your folder.
- Go to the browser and type [http://localhost:8088/](http://localhost:8088/) to see the application running.
- You can view the logs of the container via `docker logs searchservice --follow`.
- You can also view the healthcheck status via `docker inspect --format='{{json State.Health}}' searchservice`.

## Starting the service locally as Kubernetes deployment

- Clone the code into a folder of your choice.
- Make sure you have `kubectl` installed in your machine.
- Run `kubectl apply -f k8s/searchservice-deployment` in the root of your folder.
- Run `kubectl apply -f k8s/searchservice-service` in the root of your folder.
- Run `minikube tunnel` and keep it opened to be able use K8s ***Loadbalancer*** service locally.
- Run `kubectl describe svc searchservice-service` and put the `IP` into your browser to see the application running.

## Starting the service locally as Node.js application

- Clone the code into a folder of your choice.
- Make sure you have `node` and `npm` installed in your machine.
- Run **npm install** in the root of your folder.
- Copy the `/config/config.dist.json` to `/config/config.json` and set your own properties (default may be fine).
- Run **npm run dev** to start me with `nodemon`.
- Go to the browser and type [http://localhost:8088/](http://localhost:8088/) to see the application running.

## Objectives

- Add a filter and sorting option to the search API request, those should be optional but should be validated, only valid filters or sorting should be sent.

- Add a new `index.html` page in the root of the project and create a basic layout with a search bar. The search should be asynchronous and the results should appear just bellow the search bar.

- No need of fancy designs neither paging feature but limit to 10 results.