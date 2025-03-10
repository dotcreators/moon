import { Select } from '@/app/shared/ui/search/components/select';

const SEARCH_FILTERS_DATA = {
  tags: [
    {
      value: 'commissions',
      node: (
        <Select.ItemNode icon="i-ri-vip-diamond-fill" label="Commissions" />
      ),
    },
    {
      value: 'work offers',
      node: (
        <Select.ItemNode icon="i-ri-vip-diamond-fill" label="Work offers" />
      ),
    },
    {
      value: 'pixelart',
      node: <Select.ItemNode icon="i-ri-square-fill" label="Pixelart" />,
    },
    {
      value: 'textmode',
      node: <Select.ItemNode icon="i-ri-input-method-fill" label="Textmode" />,
    },
    {
      value: 'lowpoly',
      node: <Select.ItemNode icon="i-ri-shape-2-fill" label="Lowpoly" />,
    },
    {
      value: 'voxel',
      node: <Select.ItemNode icon="i-ri-box-3-fill" label="Voxel" />,
    },
    {
      value: 'gamedev',
      node: <Select.ItemNode icon="i-ri-code-fill" label="Gamedev" />,
    },
    {
      value: 'animation',
      node: <Select.ItemNode icon="i-ri-film-line" label="Animation" />,
    },
  ],
  sortBy: [
    {
      value: 'username',
      node: <Select.ItemNode icon="i-ri-at-line" label="Username" />,
    },
    {
      value: 'tweets',
      node: <Select.ItemNode icon="i-ri-file-paper-fill" label="Tweets" />,
    },
    {
      value: 'followers',
      node: <Select.ItemNode icon="i-ri-user-heart-fill" label="Followers" />,
    },
    {
      value: 'trending',
      node: <Select.ItemNode icon="i-ri-line-chart-fill" label="Trending" />,
    },
    {
      value: 'new',
      node: <Select.ItemNode icon="i-ri-seedling-fill" label="New" />,
    },
    {
      value: 'ranking',
      node: <Select.ItemNode icon="i-ri-diamond-fill" label="Ranking" />,
    },
  ],
};

export { SEARCH_FILTERS_DATA };
