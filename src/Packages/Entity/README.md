# Entity
This package provides "entity modules" as a code base for every business entity.
These modules must not have sagas nor commands or events.
The purpose of these modules solely is:
- Type definitions for entities (e.g. user type definition)
- Basic UI components for entities (e.g. rendering a username preview)
- (Probably entity specific functions, which need to be available over multiple modules)

## Package module dependencies 
None!!!