# Start an ionic app
ionic start academyTranslate blank

cd academyTranslate

ionic g page pages/languagePopover
ionic g service services/language
 
# Install the translate library
npm i @ngx-translate/core @ngx-translate/http-loader
 
# Store user selected language
npm i @ionic/storage
