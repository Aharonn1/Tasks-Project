class AppConfig {

    public port = 4002;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "taskdatabase";
}

const appConfig = new AppConfig()

export default appConfig;