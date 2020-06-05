# Translator
This module provides translation management and a standardized way to consume translation inside components.

## Module dependencies 
None.

## Usage
Following code snipped could be used in a module.
```javascript
import { TranslatedTextWC, TranslationIds } from "Packages/Common/Translator";

//...

render() {
    return (
        <TranslatedTextWC
            translation={{
                translationId: TranslationIds.LOADING,
                fallback: 'This is the fallback text if no translation was found..', //optional
                placeholders: { //optional
                    foo: 'bar',
                }
            }}
        />
    );
}

//...
```

