# MedCodeSearch – Installation Manual
MedCodeSearch requires nothing but a correctly configured webserver. Assuming that the entry point is not in a subdirectory but directly in the root of a (sub-)domain, the installation consists of two basic steps.

## 1. Upload the file structure to the server
Note again that `index.html` must be reachable directly through the root of your (sub-)domain (e.g. `http://[domain]/index.html`) for the site to work correctly.

## 2. Configure your webserver
Even it may be possible to launch the site already after step 1, accessing specific pages/requests directly via URL require some configuration. This is due to the fact that individual routes are separated by slashes (e.g. `http://[domain]/[catalog]/[version]/[etc.]`), which webservers generally interpret as traversing the folder structure of the underlying file system.

The server thus needs be told to forward all requests to missing ressources (which would otherwise return a 404-error) to `index.html`, which will then present the correct page to the user. The following settings can be used on Apache- or Nginx-servers:

### Apache
	# Enable RewriteEngine
	RewriteEngine On

	# If an existing asset or directory is requested go to it as it is
	RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
	RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
	RewriteRule ^ - [L]
	
	# If the requested resource doesn't exist, use index.html
	RewriteRule ^ /index.html

In vielen Fällen kann diese Konfiguration in eine Datei namens .htaccess geschrieben werden, welche sich im Webseiten-Root (im gleichen Ordner wie die index.html-Datei) befinden muss.

### Nginx
	location / {
    	try_files $uri$args $uri$args/ /index.html;
	}