import React, { Component, Fragment } from "react";
import { Row, Col, Input, Form, CardImg } from "reactstrap";
import "./App.css";
import img from "./components/assets/itunes.png";

class App extends Component {
  state = {
    musicas: [],
    albuns: [],
    artist: [],
    lista: true,
    value: ""
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSortClicked = this.onSortClicked.bind(this);
  }

  search() {
    fetch(
      "https://itunes.apple.com/search?term=" + this.state.value + "&limit=25"
    )
      .then(res => res.json())
      .then(data => {
        let musicas = data.results
          .map(data => data.trackCensoredName + " #" + data.artistName)
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          });

        let albuns = data.results
          .map(data => data.collectionName + " #" + data.artistName)
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          });

        let artist = data.results
          .map(data => data.artistName)
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          });

        this.setState({ musicas, albuns, artist });
      })
      .catch();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.search();
    event.preventDefault();
  }

  onSortClicked(e) {
    e.preventDefault();
    this.setState({ lista: e.target.id === "1" });
    this.search();
  }

  render() {
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <div className="cabecalho">
            <CardImg src={img} />
          </div>
          <h2 className="cabecalho-titulo">iTunes Search</h2>
          <div className="search-bar">
            <Row xs="12" style={{ width: "100%" }}>
              <Col sm={{ size: 11 }} style={{ paddingRight: "0" }}>
                <Input
                  type="text"
                  placeholder="Search musics or albuns of your artist"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm={{ size: 1 }} className="imagem-itunes">
                <i
                  className="search icon "
                  style={{
                    color: "rgba(185, 185, 185, 0.507)",
                    fontSize: "3.1em"
                  }}
                />
              </Col>
            </Row>
            <Input type="submit" style={{ display: "none" }} />
            <ul className="sorter">
              <li>
                <a id={1} href="/" onClick={this.onSortClicked}>
                  <i
                    className="music icon"
                    style={{ color: "rgba(185, 185, 185, 0.507)" }}
                  />
                  musics
                </a>
              </li>
              <li>
                <a id={2} href="/" onClick={this.onSortClicked}>
                  <i
                    className="file audio icon"
                    style={{ color: "rgba(185, 185, 185, 0.507)" }}
                  />
                  albuns
                </a>
              </li>
            </ul>
          </div>
        </Form>
        <Row style={{ background: "#3f3e3ee8", color: "rgb(218, 216, 216)" }}>
          {this.state.lista
            ? this.state.artist.map(artista => {
                let musicas = [];
                this.state.musicas.map(musica => {
                  let musicaSplit = musica.split("#");
                  if (artista === musicaSplit.pop())
                    return musicas.push(musicaSplit[0]);
                  return true;
                });
                return (
                  <div className="search-result">
                    <h3>
                      <i className="user circle icon" />
                      {artista}
                    </h3>
                    {musicas.map(musica => {
                      return (
                        <Col className="d-flex justify-content-betweenar">
                          <div className="ml-3">{musica}</div>
                          <br />
                        </Col>
                      );
                    })}
                  </div>
                );
              })
            : this.state.artist.map(artista => {
                let albuns = [];
                this.state.albuns.map(album => {
                  let albumSplit = album.split("#");
                  if (artista === albumSplit.pop()) albuns.push(albumSplit[0]);
                  return true;
                });
                return (
                  <div className="search-result">
                    <h3>
                      <i className="clone outline icon" />
                      {artista}
                    </h3>
                    {albuns.map(album => {
                      return (
                        <Col className="d-flex justify-content-between">
                          <div className="ml-3">{album}</div>
                          <br />
                        </Col>
                      );
                    })}
                  </div>
                );
              })}
          <br />
          <br />
          <br />
        </Row>
      </Fragment>
    );
  }
}

export default App;
