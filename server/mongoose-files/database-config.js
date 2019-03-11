let username = process.env.MONGO_USERNAME;
let password = process.env.MONGO_PASSWORD;

module.exports = {
	url: `mongodb://${username}:${password}@docdb-jumla.cluster-cahuszcb591a.us-east-1.docdb.amazonaws.com:27017/?ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0`,
	urlLocal: `mongodb://localhost:27017/Jumla`
};
