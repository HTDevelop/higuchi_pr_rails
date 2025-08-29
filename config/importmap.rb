# Pin npm packages by running ./bin/importmap

pin "application", preload: true
# pin "jquery", to: "https://code.jquery.com/jquery-3.7.1.min.js", preload: true

pin_all_from 'app/javascript/files', under: 'files'