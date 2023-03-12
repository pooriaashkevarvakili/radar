FROM core.harbor.mrbilit.net/hub/library/node:14.17.0 as build-stage
WORKDIR /app
COPY . .
RUN npm config set cache .npm
ENTRYPOINT HOST=0.0.0.0 npm run start
