var Offshore = require('../../../../lib/offshore');
var assert = require('assert');
var memory = require('offshore-memory');

describe('Polymorphic associations', function() {

  var Comment;
  var Post;
  var News;
  var Video;
  var Picture;
  var Tag;


  before(function(done) {
    var offshore = new Offshore();
    var collections = {};


    collections.comment = Offshore.Collection.extend({
      identity: 'comment',
      connection: 'polymorphic',
      attributes: {
        id: {
          type: 'integer',
          primaryKey: true
        },
        text: 'string',
        parent: {
          model: ['post', 'news'],
          polymorphic: true
        }
      }
    });

    collections.post = Offshore.Collection.extend({
      identity: 'post',
      connection: 'polymorphic',
      attributes: {
        id: {
          type: 'integer',
          primaryKey: true
        },
        comments: {
          collection: 'comment',
          via: 'parent'
        },
        related: {
          collection: ['video', 'picture'],
          via: 'related',
          polymorphic: true
        },
        tags: {
          collection: 'tag',
          via: 'tagged'
        }
      }
    });

    collections.news = Offshore.Collection.extend({
      identity: 'news',
      connection: 'polymorphic',
      attributes: {
        id: {
          type: 'integer',
          primaryKey: true
        },
        comments: {
          collection: 'comment',
          via: 'parent'
        },
        related: {
          collection: ['video', 'picture'],
          via: 'related',
          polymorphic: true
        },
        tags: {
          collection: 'tag',
          via: 'tagged'
        }
      }
    });

    collections.picture = Offshore.Collection.extend({
      identity: 'picture',
      connection: 'polymorphic',
      attributes: {
        id: {
          type: 'integer',
          primaryKey: true
        },
        data: 'binary',
        related: {
          collection: ['post', 'news'],
          via: 'media',
          polymorphic: true
        },
        tags: {
          collection: 'tag',
          via: 'tagged'
        }
      }
    });

    collections.video = Offshore.Collection.extend({
      identity: 'video',
      connection: 'polymorphic',
      attributes: {
        id: {
          type: 'integer',
          primaryKey: true
        },
        data: 'binary',
        related: {
          collection: ['post', 'news'],
          via: 'media',
          polymorphic: true
        },
        tags: {
          collection: 'tag',
          via: 'tagged'
        }
      }
    });

    collections.tag = Offshore.Collection.extend({
      identity: 'tag',
      connection: 'polymorphic',
      attributes: {
        id: {
          type: 'integer',
          primaryKey: true
        },
        word: 'string',
        tagged: {
          collection: ['post', 'news', 'picture', 'video'],
          via: 'tag',
          polymorphic: true
        }
      }
    });

    offshore.loadCollection(collections.comment);
    offshore.loadCollection(collections.post);
    offshore.loadCollection(collections.news);
    offshore.loadCollection(collections.video);
    offshore.loadCollection(collections.picture);
    offshore.loadCollection(collections.tag);

    var connections = {
      'polymorphic': {
        adapter: 'memory'
      }
    };

    offshore.initialize({adapters: {memory: memory}, connections: connections}, function(err, colls) {
      if (err) {
        done(err);
      }
      Comment = colls.collections.comment;
      Post = colls.collections.post;
      News = colls.collections.news;
      Video = colls.collections.video;
      Picture = colls.collections.picture;
      Tag = colls.collections.tag;
      done();
    });
  });

  describe('belongsTo', function() {
    console.log(Comment);
    console.log(Post);
    console.log(News);
    it('should create a polymorphic belongsTo association', function(done) {
      done();
    });
  });

  describe('hasMany', function() {
  });

  describe('manyToMany', function() {
  });
});