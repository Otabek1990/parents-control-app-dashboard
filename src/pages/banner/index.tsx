import { Card, Col, Row } from 'antd';
import { useQuery } from '@tanstack/react-query';

import TitleCard from '@components/core/TitleCard';
import CreateUpdateBanner from './CreateUpdateBanner';

import { BannerService } from 'services/openapi/services/BannerService';
import { BannerList } from 'services/openapi/models/BannerList';
import { API_URL } from '@config/constants';
import Loading from '@components/core/Loading';

const Banner = () => {
  const {
    data: banners,
    isSuccess,
    isLoading,
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
      {isLoading && <Loading />}

      {isSuccess && banners?.results?.length && (
        <Card>
          
            <Row gutter={[16, 16]}>
              {banners?.results?.map((item: BannerList, index: number) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <img
                        style={{ height: '220px', objectFit: 'cover' }}
                        alt={item?.title}
                        src={`${API_URL.slice(0, -3)}${item.photo}`}
                      />
                    }
                  >
                    <Card.Meta title={item?.title} description={item?.description} />
                  </Card>
                </Col>
              ))}
            </Row>
          
        </Card>
      )}
    </>
  );
};

export default Banner;
