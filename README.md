# Signal Annotation Tool (Server)

* [Signal Annotation Tool](https://github.com/phev8/signal-annotation-tool)
* [Signal Annotation Tool (Client)](https://github.com/etherealyn/signal-annotation-tool-client) 
* [Signal Annotation Tool (Server)](https://github.com/etherealyn/signal-annotation-tool-server) (this repository)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The project requires the following software present on your local machine: 

* MongoDB 
  * a local instance listening on `localhost:27017`
* Node.js
* NPM

### Installing

Once the prerequisites fulfilled, open a terminal, go to the root of this repository and run:

This step installs all dependencies:
```bash
npm install
```

For the development server to be running in incremental mode (i.e., changes in code will be catched and reflected automatically) simply run:
```bash
npm run watch
```

And then:

```bash
npm run start
```

At this point the server is running and you need to install the client.

## Built With

* [NestJS](https://docs.nestjs.com/) - The web framework used
* [Socket.io](https://socket.io/docs/) - Real-time, bidirectional and event-based communication
* [MongoDB](https://www.mongodb.com/what-is-mongodb) - A popular NoSQL document-oriented database

<!--## Contributing-->

<!--Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.-->

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/etherealyn/signal-annotation-tool-server/tags). 

<!--## Authors-->

<!--* **Aziret Satybaldiev**-->
<!--* **Peter Hevesi**-->

<!--See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.-->

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

<!--## Acknowledgments-->

<!--* Hat tip to anyone whose code was used-->
<!--* Inspiration-->
<!--* etc-->
