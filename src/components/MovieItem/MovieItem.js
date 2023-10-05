import React, { Component } from 'react';
import { Card, Image, Typography, Tag, Space, Rate, Spin } from 'antd';
const { Title, Paragraph } = Typography;

import './MovieItem.scss';
import {
  noCoverPlaceholder,
  URLfilmCover,
  AddMovieToRatedList,
  getRatedMoviesList,
} from '../../services/moviesapi';
import { ContextConsumer } from '../../services/context.js';

export default class MovieItem extends Component {
  setRateColor(rate) {
    if (rate <= 3) return '#E90000';
    if (rate <= 5) return '#E97E00';
    if (rate <= 7) return '#E9D100';
    return '#66E900';
  }

  addToFavorites = (movieID, sessionID, event) => {
    AddMovieToRatedList(movieID, sessionID, event).then(() => {
      getRatedMoviesList(sessionID).then(() => {
        this.props.setToUpdate();
      });
    });
  };

  renderMovieGenres = (movieGenres, IDs) => {
    return IDs.map((ID) => {
      const genreTag = movieGenres.find((item) => item.id === ID);
      return (
        <Tag
          key={genreTag.id}
          style={{
            fontFamily: 'Inter UI',
            marginInlineEnd: 0,
            borderRadius: '2px',
            color: 'rgba(0, 0, 0, 0.65)',
          }}
        >
          {genreTag.name || null}
        </Tag>
      );
    });
  };

  render() {
    const {
      ID,
      shortTitle,
      fullTitle,
      genreIDs,
      coverPath,
      ownRating,
      avgRating,
      release,
      overview,
    } = this.props;

    const preloadCoverPlaceholder = (
      <Space
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(190, 190, 190, 0.90)',
        }}
      >
        <Spin
          size="large"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Space>
    );

    return (
      <ContextConsumer>
        {(MainState) => {
          return (
            <Card
              className="moviecard"
              bodyStyle={{ display: 'flex', padding: 0 }}
              hoverable
            >
              <Image
                className="moviecard__img"
                style={{
                  position: 'relative',
                  height: '280px',
                  width: '180px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  objectFit: 'cover',
                }}
                src={`${URLfilmCover}${coverPath}`}
                fallback={noCoverPlaceholder}
                placeholder={preloadCoverPlaceholder}
              />
              <Space
                className="moviecard__desc"
                style={{
                  padding: '10px 20px',
                  flex: 1,
                  rowGap: 0,
                }}
                direction="vertical"
              >
                <Title
                  style={{ fontFamily: 'Inter UI' }}
                  level={4}
                  title={fullTitle}
                >
                  {shortTitle}
                </Title>
                <Space
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                    top: '10px',
                    right: '10px',
                    fontFamily: 'Inter UI',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: '2px solid black',
                    borderRadius: '50%',
                    borderColor: this.setRateColor(avgRating),
                  }}
                >
                  {avgRating}
                </Space>
                <Paragraph
                  className="moviecard__release"
                  style={{
                    fontFamily: 'Inter UI',
                    fontSize: '12px',
                    color: '#827e7e',
                  }}
                >
                  {release}
                </Paragraph>
                <Space wrap>
                  {this.renderMovieGenres(MainState.movieGenres, genreIDs)}
                </Space>
                <Paragraph
                  className="moviecard__overview"
                  style={{
                    marginTop: '10px',
                    fontFamily: 'Inter UI',
                    fontSize: '12px',
                    lineHeight: '21px',
                    fontWeight: 'bold',
                  }}
                >
                  {overview}
                </Paragraph>
                <Rate
                  style={{
                    position: 'absolute',
                    fontSize: '20px',
                    bottom: '10px',
                    right: '20px',
                  }}
                  value={ownRating}
                  allowHalf
                  count={10}
                  onChange={(event) =>
                    this.addToFavorites(ID, MainState.sessionID, event)
                  }
                />
              </Space>
            </Card>
          );
        }}
      </ContextConsumer>
    );
  }
}
