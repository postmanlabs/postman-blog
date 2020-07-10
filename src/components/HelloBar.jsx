import React from 'react';
import styled from 'styled-components';

const bardata = {
  title: 'What do you see for the future of APIs? Take the 15-minute',
  cta: {
    text: 'State of the API survey',
    url: 'https://www.surveymonkey.com/r/2020-API-Survey',
  },
};

const PostmanLink = styled.a`
height: 24px;
font-weight: 700;
color: #282828;
background-image: linear-gradient(180deg, transparent 50%, rgba(249,157,120,.5) 0);
padding-right: 4px;
padding-bottom: 2px;
background-position-y: 2px;
background-position-x: 4px;
background-repeat: no-repeat;
text-decoration: none;
transition: .18s ease;

&:hover {
  background-position: top 7px right -4px;
  padding-right: 4px;
  color: #282828;
  padding-bottom: 2px;
  text-decoration: none;
  background-image: linear-gradient(180deg, transparent 60%, rgba(249, 157, 120, 1) 0);
}
`;

const Container = styled.div`
  background-color: #DBE9F2;
  min-height: 44px;
`;

const Text = styled.p`
  min-height: 100%;
  margin-bottom: 0px;
  text-align: center;
  padding: 10px;
  color: #282828;
  font-weight: 700;
`;

const CloseButton = styled.span`
  position: absolute;
  right: 20px;
  top: 8px;
  background-repeat: no-repeat;
  cursor: pointer; 
`;

class HelloBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBar: false,
    };
    this.closeBar = () => {
      localStorage.setItem('hellobar', bardata.title);
      localStorage.setItem('hellobarcount', '0');
      this.setState({ showBar: false });
    };
  }

  componentDidMount() {
    const barValue = localStorage.getItem('hellobar');
    let barCount = JSON.parse(localStorage.getItem('hellobarcount')) || 0;

    if (barValue !== bardata.title) {
      barCount += 1;
      if (barCount > 5) {
        this.setState({ showBar: false });
        localStorage.setItem('hellobar', bardata.title);
        localStorage.setItem('hellobarcount', '0');
      } else {
        localStorage.setItem('hellobarcount', JSON.stringify(barCount));
        this.setState({ showBar: true });
      }
    } else {
      this.setState({ showBar: false });
    }
  }


  render() {
    const { showBar, bardata } = this.state;
    console.log(bardata)
    if (showBar === true) {
      return (
        <Container>
          <Text className="align-middle">
            {bardata.title}
            <PostmanLink data={bardata.cta} target='_blank' rel='noopener'/>
          </Text>
          <CloseButton onClick={this.closeBar}>X</CloseButton>
        </Container>
      );
    }
    return (<></>);
  }
}

export default HelloBar;
