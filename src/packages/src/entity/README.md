[« api docs overview](../../../../docs/api.docs.md)

# Entity package
This package provides "entity modules" as a codebase for every business entity.
These modules must not have sagas nor commands or events.
The purpose of these modules solely is:
- Type definitions for entities (e.g. user type definition)
- Basic UI components for entities (e.g. rendering a username preview)
- (Probably entity specific functions, which need to be available over multiple modules)

## Dependencies 
This package must have no dependencies.

## Modules
- packages/entity/auth-user
- packages/entity/user