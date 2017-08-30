# React Starter Kit, PostgreSQL, and Docker


### Installing PostgreSQL on Ubuntu Xenial

To install PostgreSQL like i did, follow [these instructions](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)

## Configuring PostgreSQL for Docker and RSK

In terminal:

- `sudo su Postgres`
- `createuser -DRS -W -P < DB-username >`
  - `-W` Force psql to prompt for a password before connecting to a database.
  - `-P` If given, createuser will issue a prompt for the password of the new user. This is not necessary if you do not plan on using password authentication.
  - More information found at [the PostgreSQL docs](https://www.postgresql.org/docs/9.5/static/app-createuser.html)
- `createdb -O < DB-owner > < DB-name >`
  - More information found at [the PostgreSQL docs](https://www.postgresql.org/docs/9.5/static/app-createdb.html)
- Exit to your user or open a new terminal and run `sudo service postgresql restart`

---

## Downloading RSK and connect to PostgreSQL

If you haven't downloaded the RSK-feature/apollo branch from GitHub, you should do that now

- `git clone https://github.com/kriasoft/react-starter-kit/tree/feature/apollo.git`

Before we move further, delete the sqlite3 dependency from package.json and install PostgreSQL dependencies as described at [the Squelize docs](http://docs.sequelizejs.com/manual/installation/getting-started).

I'm using a specific version of pg due to an error that happened if I just installed pg. The dependencies I added is:

- `"pg": "6.4.1"`
- `"pg-hstore": "^2.3.2"`

---

Now, go to `/src/config.js`

- Find the `databaseUrl` export and change the URI-string to your connection, assuming your user, database and password are tes, you should replace the string with a connection URI: `postgres://tes:tes@localhost/tes`

You can find an example under the 'Setting up a connection' code block in [the Sequelize docs](http://docs.sequelizejs.com/manual/installation/getting-started).

Save your files and install the project:

- `yarn install`

> Note: If you already ran yarn install, do it again and it will update your dependencies.

Run the app in development mode:

- `yarn start`

After you've made these commands, some SQL should show up in the console. If not, the error messages are really helpful.

To see if the default user tables got created, go to your terminal:

- `sudo su postgres`
- `psql tes`
- `\dt`

The output should look like this:

```sql
tes=# \dt
          List of relations
 Schema |    Name     | Type  | Owner
--------+-------------+-------+-------
 public | User        | table | tes
 public | UserClaim   | table | tes
 public | UserLogin   | table | tes
 public | UserProfile | table | tes
(4 rows)
```

## Connecting RSK Docker image to PostgreSQL
If you already have docker-ce installed, great! Otherwise, you'd want to install Docker.

- Follow the great guide in [Dockers documentation](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/).
- Open `/etc/postgresql/9.5/main/PostgreSQL.conf` with your favorite editor
- Uncomment the 'listen_addresses' line and change localhost to an asterisk to allow connections from all IP-addresses. The line should look like this:

```sql
listen_addresses = '*'
```
> Note: If you do not want to allow connections from all IP addresses, you can write a single address or a list separated by commas.
- Open `/etc/postgresql/9.5/main/pg_hba.conf` and add the following line under IPv4 local connections:

`host   all   all   172.17.0.0/16  md5`

What you are defining:

| TYPE   | DATABASE   | USER   | ADDRESS       | METHOD   |
|--------|------------|--------|---------------|----------|
| host   |  all       | all    | 172.17.0.0/16 | md5      |

For more information, looking at comments in pg_hba.conf will get you a long way.

> Note: if you run `ip a` and look for docker, you can see this address. For more information look [at this great answer](https://stackoverflow.com/questions/31249112/allow-docker-container-to-connect-to-a-local-host-postgres-database)

- Go to `/src/config.js`
- Find the `databaseUrl` export and change the URI-string to your connection, assuming your user, database and password are tes;  replace the string with: `postgres://tes:tes@database:5432/tes`

**The only change from before is connecting to the host 'database' on port 5432 instead of localhost.**

### Running the docker image

> Note: `--add-host=database:< HOST-IP >` adds a line to /etc/hosts in the Docker container, with the IP and exposes that IP as 'database' in the container.

- `sudo docker run --name rsk -p 3000:3000 --add-host=database:< HOST-IP > web:latest`
