[« api docs overview](../../../../docs/api.docs.md)

# Common package
This package provides common base functionality modules.
Depending on the functionality of an app,
some modules of this package need to be wired up in the app's service factory.

## Modules
- [translator](translator/README.md) - translation components for the whole UI
- [http-foundation](http-foundation/README.md) - a single point for http request handling
- [http-api-v1](http-api-v1/README.md) - calling endpoints with explicitly defined result types
- [form](form/README.md) - handle form submits and error enrichment in a standardized way
