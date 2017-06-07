// Wrapper around global Twitch extension object.
class Ext {
    static onAuthorized(cb) {
        window.Twitch.ext.onAuthorized(cb);
    }

    static onContext(cb) {
        window.Twitch.ext.onContext(cb);
    }
}

export default Ext;
