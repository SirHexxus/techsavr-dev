import React from 'react';
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';

const SiteTableHeader = ({ isPaidAccount }) => {
  // console.log({ isPaidAccount });
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700" fontSize="sm">
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>
        {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
      </Flex>
    </>
  );
};

export default SiteTableHeader;
