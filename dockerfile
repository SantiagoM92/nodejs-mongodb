FROM node:20-alpine
RUN mkdir -p /home/node/app/  && mkdir -p /home/node/tmp/ && chown -R node:node /home/node/
COPY --chown=node:node ./ /home/node/tmp/
USER node
WORKDIR /home/node/tmp
RUN npm install && npm run build
RUN cd /home/node/tmp && \
    mv -f /home/node/tmp/dist /home/node/app && \
    mv -f /home/node/tmp/package* /home/node/app/ && \
    mv -f /home/node/tmp/tsconfig* /home/node/app/ && \
    mv -f /home/node/tmp/node_modules  /home/node/app && \
    rm -rf  /home/node/tmp
WORKDIR /home/node/app
EXPOSE 3000
CMD [ "npm", "run", "start:prod"]