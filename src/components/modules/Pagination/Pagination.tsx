import {
  Flex,
  Button,
  ResponsiveValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { RenderCondition } from '~/utils';

interface IPagination {
  numPages?: number;
  onClickPage: (page: number) => void;
  pageActive?: number;
  maxPagesAroundPageActive?: number;
  borderRadius?: string;
  primaryColor: ResponsiveValue<string>;
  fontSize?: ResponsiveValue<string | number>;
}
const Pagination: React.FC<IPagination> = ({
  numPages,
  onClickPage,
  pageActive,
  maxPagesAroundPageActive,
  borderRadius,
  primaryColor,
  fontSize,
}) => {
  const maxPagesAround = maxPagesAroundPageActive || 1;

  const showButtonPage = (index: number) => {
    if (
      (index < (pageActive as number) + maxPagesAround + 1 &&
        index > (pageActive as number) - maxPagesAround - 1) ||
      index === (numPages as number) - 1 ||
      index === 0
    )
      return true;

    return false;
  };
  return (
    <Flex width="100%" gap="1rem" justify="flex-end" align="flex-start">
      <RenderCondition condition={numPages !== 1 && pageActive !== 0}>
        <ChevronLeftIcon
          onClick={() => onClickPage(Number(pageActive) - 1)}
          cursor="pointer"
          width={['1rem', '1.5rem']}
          height={['1.5rem', '2rem']}
          mt="0.2rem"
          color={primaryColor}
          borderRadius={'4px' || borderRadius}
        />
      </RenderCondition>
      <Flex flexWrap="wrap" justify="flex-end" gap="0.5rem">
        {Array.from(Array(numPages || 0), (element, index) => (
          <RenderCondition key={index} condition={showButtonPage(index)}>
            {index === (numPages as number) - 1 &&
              (pageActive as number) + maxPagesAround <
                (numPages as number) - 1 && <>...</>}
            <Button
              disabled={numPages === 1}
              backgroundColor={pageActive === index ? primaryColor : 'white'}
              color={pageActive === index ? 'white' : primaryColor}
              border={
                pageActive === index
                  ? '1px solid white'
                  : `1px solid ${primaryColor}`
              }
              width={['2rem', '2.5rem']}
              height={['2rem', '2.5rem']}
              borderRadius="0.2rem"
              fontWeight="bold"
              onClick={() => onClickPage(index)}
              fontSize={['12px', '14px'] || fontSize}
            >
              {index + 1}
            </Button>
            {index === 0 && (pageActive as number) - maxPagesAround > 0 && (
              <>...</>
            )}
          </RenderCondition>
        ))}
      </Flex>
      <RenderCondition
        condition={numPages !== 1 && numPages !== (pageActive as number) + 1}
      >
        <ChevronRightIcon
          onClick={() => onClickPage(Number(pageActive) + 1)}
          cursor="pointer"
          width={['1rem', '1.5rem']}
          height={['1.5rem', '2rem']}
          mt="0.2rem"
          color={primaryColor}
          borderRadius={'4px' || borderRadius}
        />
      </RenderCondition>
    </Flex>
  );
};
export default Pagination;
