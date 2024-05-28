import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface TopicSelectorProps {
  topics: string[];
  selectedTopics: string[];
  onChange: (event: React.SyntheticEvent, newValue: string[]) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ topics, selectedTopics, onChange }) => (
  <Autocomplete
    multiple
    id="multiple-limit-tags"
    options={topics}
    value={selectedTopics}
    onChange={onChange}
    renderInput={(params) => (
      <TextField
        {...params}
        label="무엇이 고민인가요?"
        placeholder=""
      />
    )}
    sx={{ width: '100%', mb: 2, mt: 2 }}
  />
);

export default TopicSelector;
