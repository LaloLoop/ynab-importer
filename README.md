# YNAB Importer

This project is intended to serve as a personal tool to import YNAB data into a [Prisma](http://prisma.io) supported database, e.g. a relational/SQL database. The project uses the official [YNAB JavaScript SDK](https://www.npmjs.com/package/ynab), and aims to be as tested as possible.

The project is intended to eventually run as a serverless workload to keep information up to date, there are no plans for a UI at the moment.

Other purposes include learning Typescript with actual TestDriven development, as well as creating the building blocks for a much larger system to orient YNAB towards investing.

## Testing

To run the tests, execute `npm test`.

## Fixtures

Please notice that the fixtures have been anonymized, and are there only for testing purposes.

## ToDo

- [ ] Implement Prisma model to store YNAB resources.
- [ ] Decide how to best store subsequent updates to the model.
- [ ] Configure Serverless DB example and add instructions, e.g. CockroachDB.
- [ ] Deploy to a cloud provider to have it continuously run.

## Author

- Eduardo Gutiérrez Silva - @LaloLoop