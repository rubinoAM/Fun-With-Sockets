//Classes
const Namespace = require('../classes/Namespace');
const Room = require('../classes/Room');

//Namespaces
let namespaces = [];
let wikiNS = new Namespace(0,'Wiki','https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png','/wiki');
let mozNS = new Namespace(1,'Mozilla','https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png','/mozilla');
let linuxNS = new Namespace(2,'Linux','https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png','/linux');
namespaces.push(wikiNS,mozNS,linuxNS);

/*Rooms
    -The main room will always be 0 */
wikiNS.addRoom(new Room(0,'New Articles','Wiki'));
wikiNS.addRoom(new Room(1,'Editors','Wiki'));
wikiNS.addRoom(new Room(2,'Other','Wiki'));

mozNS.addRoom(new Room(0,'Firefox','Mozilla'));
mozNS.addRoom(new Room(1,'SeaMonkey','Mozilla'));
mozNS.addRoom(new Room(2,'SpiderMonkey','Mozilla'));
mozNS.addRoom(new Room(3,'Rust','Mozilla'));

linuxNS.addRoom(new Room(0,'Debian','Linux'));
linuxNS.addRoom(new Room(1,'Red Hat','Linux'));
linuxNS.addRoom(new Room(2,'MacOS','Linux'));
linuxNS.addRoom(new Room(3,'Kernal Development','Linux'));

module.exports = namespace;