import { Component } from 'react';
import { Card, Image, Typography, Tag, Space, Rate } from 'antd';
const { Title, Paragraph } = Typography;

import './MovieItem.scss';

import { URLfilmCover, NoCoverPlaceholder } from '../../services/moviesapi';

export default class MovieItem extends Component {
  render() {
    const { title, coverPath, avgRating, release, overview } = this.props;

    return (
      <Card
        className="moviecard"
        bodyStyle={{ display: 'flex', padding: 0 }}
        hoverable
      >
        <Image
          height={280}
          width={180}
          style={{ objectFit: 'cover' }}
          src={`${URLfilmCover}${coverPath}`}
          fallback={NoCoverPlaceholder}
        />

        <Space
          style={{ padding: '10px 20px', flex: 1, rowGap: 0 }}
          direction="vertical"
        >
          <Title
            style={{
              fontFamily: 'Inter UI',
              whiteSpace: 'no-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            level={4}
          >
            {title}
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
            }}
          >
            {avgRating}
          </Space>
          <Paragraph
            style={{ fontFamily: 'Inter UI', fontSize: '12px', color: '#827e7e' }}
          >
            {release}
          </Paragraph>
          <Space>
            <Tag className="moviecard__label">Tag 1</Tag>
            <Tag className="moviecard__label">Tag 2</Tag>
            <Tag className="moviecard__label">Tag 3</Tag>
            <Tag className="moviecard__label">Tag 4</Tag>
          </Space>
          <Paragraph
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
            allowHalf
            count={10}
          />
        </Space>
      </Card>
    );
  }
}
