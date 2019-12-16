[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# LumenRestSupport
Google ReCaptcha and modified validator message bag, created for Single Page Apps (SPA) and Lumen 5.4 Rest API.

## Installation

 1. Paste following code in register()-method of your
    */app/Providers/AppServiceProvider.php*:
    
        $this->app->register('Inkognitro\LumenRestSupport\Providers\LumenServiceProvider');
       
 2. Define following variables in your */.env*:
    
        CAPTCHA_CLIENT_ID=[client id (no value needed for google recaptcha)]
        CAPTCHA_CLIENT_SECRET=[client secret]


## Usage
1. You now can use google's reCaptcha with the 'captcha'-validation rule.

2. Catch the modified validation message bag:
Maybe you would like to return the modified MessageBag of Laravel Validator as json. Then you can use the getMessageBag()-method of *Illuminate\Validation\Validator* after a ValidationException has been fired:
Add following example code into the render()-method of your */app/Exceptions/Handler.php*:  

        if($e instanceof ValidationException) { dd($e->validator->getMessageBag()); }
      Maybe you would like to use a "JsonResponder" class or something like that and not the dd()-method.
