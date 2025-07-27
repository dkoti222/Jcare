import React from 'react';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { colors } from '../theme/colors';
import { customFonts } from '../theme/fonts';

type GlobalDropDownProps<T> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: T | null;
  setValue: React.Dispatch<React.SetStateAction<T | null>>;
  items: ItemType<T>[];
  setItems: React.Dispatch<React.SetStateAction<ItemType<T>[]>>;
  placeholder?: string;
  style?: object;
  [key: string]: any;
};

const GlobalDropDown = <T extends string | number>({
  open,
  setOpen,
  value,
  setValue,
  items,
  setItems,
  placeholder = 'Select an item',
  style = {},
  ...props
}: GlobalDropDownProps<T>) => {
  return (
  <DropDownPicker
  open={open}
  value={value}
  items={items}
  setOpen={setOpen}
  setValue={setValue}
  setItems={setItems}
  placeholder={placeholder}
  style={{
    backgroundColor: colors.grayLight,
    borderColor: colors.gray,
    ...style,
  }}
  dropDownContainerStyle={{
    backgroundColor: colors.grayLight,
    borderColor: colors.gray,
  }}
  textStyle={{
    color: value ? 'black' : colors.gray, // selected: black, placeholder: gray
    fontFamily: value ? customFonts.interSemi_Bold : customFonts.interRegular


  }}
  {...props}
/>

  );
};

export default GlobalDropDown;
