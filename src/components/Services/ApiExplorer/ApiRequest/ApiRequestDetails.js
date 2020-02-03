import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ApiRequestDetails extends Component {
  render() {
    const styles = require('../ApiExplorer.scss');
    return (
      <div className={styles.apiRequestWrapper + ' ' + styles.apiContentPadd}>
        <div className={styles.apiRequestContent}>TELOS DreamStack GraphiQL Explorer</div>
        <div className={styles.built}>
          Built with <i className="fa fa-heart" /> by <a href={'http://blockmatic.io/'} target={'_blank'}>Blockmatic</a>
        </div>
        <div className={styles.apiHasura}>
          <a href="https://github.com/telosdreamstack" target={'_blank'}>
            <i className="fa fa-github" />
          </a>
        </div>
      </div>
    );
  }
}

ApiRequestDetails.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ApiRequestDetails;
