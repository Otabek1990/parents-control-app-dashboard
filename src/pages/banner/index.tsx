import { Card, Col, Row } from 'antd';
import { useQuery } from '@tanstack/react-query';

import TitleCard from '@components/core/TitleCard';
import CreateUpdateBanner from './CreateUpdateBanner';

import { BannerService } from 'services/openapi/services/BannerService';
import { BannerList } from 'services/openapi/models/BannerList';
import { API_URL } from '@config/constants';

const Banner = () => {
  const {
    data: banners,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['banner'],
    queryFn: () => BannerService.bannerList(),
  });

  return (
    <>
      <TitleCard titleName="Banners">
        <CreateUpdateBanner refetch={refetch} />
      </TitleCard>
      <Card>
        {isSuccess && (
          <>
            <Row gutter={[16, 16]}>
              {banners.results?.map((item: BannerList, index: number) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card hoverable cover={<img alt={item.title} src={`${API_URL}${item.photo}`} />}>
                    <Card.Meta title={item.title} description={item?.description} />
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Card>
    </>
  );
};

export default Banner;
