# Translator
This module provides a standardized way to consume translations inside components.

## Module dependencies 
None.

## Usage
Following code snipped could be used in a module.
```javascript
import React, { FC, Fragment } from 'react';
import { TranslatedTextWC, TranslationIds } from "Packages/Common/Translator";

export const SomeComponent: FC = () => {
    return (
        <Fragment>
            <div>Below you can see some translated text.</div>
            <TranslatedTextWC
                translation={{
                    translationId: TranslationIds.LOADING,
                    fallback: 'This is the fallback text if no translation was found.', //optional
                    placeholders: { //optional
                        foo: 'bar',
                    }
                }}
            />
        </Fragment>
    );
}
```

