var main = {
  urls: {
    src: "server/img",
  },
  events: {},
  mac: null,
  token: null,
  state: null,
};

/* on init app */
main.init = function () {
  loading.init();
  player.init();
  session.init();
  main.events.isLogged();
};

main.events.isLogged = function () {
  session.valid({
    success: function () {
      main.events.home();
    },
    error: function () {
      loading.destroy();
      login.init();
    },
  });
};

main.events.home = function () {
  service.list({
    data: {
      type: home.type,
      filter: home.filter,
    },
    success: function (response) {
      loading.destroy();
      home.data.series = response.data;
      home.init();
    },
    error: function () {
      loading.destroy();
      login.init();
    },
  });
};

/* on exit app */
main.destroy = function () {
  player.destroy();
};

/* on key press */
main.keyDown = function (event) {
  if (event.keyCode == tvKey.KEY_EXIT && main.state != exit.id) {
    exit.init();
  } else {
    switch (main.state) {
      case loading.id:
        loading.keyDown(event);
        break;
      case exit.id:
        exit.keyDown(event);
        break;
      case login.id:
        login.keyDown(event);
        break;
      case keyboard.id:
        keyboard.keyDown(event);
        break;
      case menu.id:
        menu.keyDown(event);
        break;
      case home.id:
        home.keyDown(event);
        break;
      case video.id:
        video.keyDown(event);
        break;
      default:
        console.log("keyboard action screen not defined.");
        break;
    }
  }
};
