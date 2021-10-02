var Overlay = function(){

  this._configs = {},
  this.isSettingsVisible = false,
  this.isMouseVisible = false;

  _self = this;



  this._init = () => {

  };

  this.load = configs => {
    _self._configs = configs;
    _self._init();
  }

  this.toggleSettings = () => {
    _self.isSettingsVisible = !_self.isSettingsVisible;
    let el = document.getElementById('settings-container');
    if (_self.isSettingsVisible){
      el.classList.remove('d-none');
    }else {
      el.classList.add('d-none');
    }
  };

  this.toggleMouse = () => {

  };

};

window.Overlay = Overlay;