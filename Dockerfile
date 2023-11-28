FROM httpd:2.4

COPY ./src/ /usr/local/apache2/htdocs/

RUN mv /usr/local/apache2/htdocs/pages/index.html /usr/local/apache2/htdocs/index.html