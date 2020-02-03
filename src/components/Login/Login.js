import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './App.css';
import { updateGraphQLEndpoint } from '../Services/ApiExplorer/Actions';

const isProd = window.location.hostname.includes('graph.telosdreamstack');
const graphqlEndpoint = isProd ?
  'http://mainnet.graph.telosdreamstack.io/v1/graphql' :
  'http://hasura.local.telosdreamstack.io/v1/graphql';

console.log(`LOGIN graphqlEndpoint=${graphqlEndpoint}`);

class LoginComponent extends React.Component {
  constructor() {
    super();
    this.state = { graphqlEndpoint: '' };
  }
  setGraphQLEndpoint(e) {
    this.setState({ graphqlEndpoint: e.target.value });
  }
  render() {
    const { dispatch } = this.props;
    dispatch(updateGraphQLEndpoint(graphqlEndpoint));
    return (
      <div>
        <div className="loginWrapper">
          <Helmet
            title="Telos GraphQL Explorer"
            description="A Telos GraphQL Explorer. Based on GraphiQL."
          />
          <h2 className="loginHeading"> Online GraphiQL </h2>
          <div className="login">
            <div>
              <form>
                <input
                  type="text"
                  id="username"
                  className="loginTextbox"
                  placeholder="Enter GraphQL Endpoint URL"
                  onChange={this.setGraphQLEndpoint.bind(this)}
                />
                <button
                  className="loginButton"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    const urlRegex= /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
                    if (!urlRegex.test(this.state.graphqlEndpoint)) {
                      // check if localhost url
                      const localhostRegex = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
                      if(!localhostRegex.test(this.state.graphqlEndpoint)) {
                        alert('Please enter a valid URL');
                      } else {
                        dispatch(updateGraphQLEndpoint(this.state.graphqlEndpoint));
                      }
                    } else {
                      dispatch(updateGraphQLEndpoint(this.state.graphqlEndpoint));
                    }
                  }}
                >
                  <i className={'fa fa-sign-in'} />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="footerWrapper">
          <div className="built">
            Built with <i className="fa fa-heart" /> by <a href={'http://hasura.io/'} target={'_blank'}>Hasura</a>
          </div>
          <div className="apiHasura">
            <a href="https://github.com/hasura/graphql-engine/tree/master/community/tools/graphiql-online" target={'_blank'}>
              <i className="fa fa-github" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const generatedLoginComponent = connect => {
  const mapStateToProps = state => {
    return {
      ...state.apiexplorer,
    };
  };
  return connect(mapStateToProps)(LoginComponent);
};

export default generatedLoginComponent;

