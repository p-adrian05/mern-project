module.exports = {
  READY: 'ready for production',
  UNDER_PROD: 'under production',
  FINISHED: 'finished',
  of (state) {
    switch (state.toLowerCase()) {
      case 'ready':
        return this.READY;
      case this.READY:
        return this.READY;
      case 'finished':
        return this.FINISHED;
      case 'underprod':
        return this.UNDER_PROD;
      case this.UNDER_PROD:
        return this.UNDER_PROD;
    }
    return null;
  }
};
