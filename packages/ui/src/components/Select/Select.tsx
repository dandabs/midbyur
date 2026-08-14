"use client";

import { ChevronDown, Check } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, View, type ViewStyle } from "react-native";
import { withClassName } from "../../cssInterop";
import { FlatList } from "../FlatList/FlatList";
import { Icon } from "../Icon/Icon";
import { Input } from "../Input/Input";
import { Modal } from "../Modal/Modal";
import { Text } from "../Text/Text";

export type SelectOption<T extends string> = Readonly<{
  value: T;
  label: string;
}>;

export type SelectProps<T extends string> = Readonly<{
  value: T | null;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  title?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
}>;

const rowStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 14,
  paddingHorizontal: 4,
};

// `.mb-input` (the class the trigger below shares with Input's outer wrapper) only carries
// horizontal padding — Input's matching vertical padding lives on `.mb-input__field`, applied to
// its inner TextInput, which this Pressable has no equivalent of. Matching that padding+line-height
// on this Text turned out unreliable (line-height from a CSS class doesn't measure the same on
// native as it does on web), so pin the trigger to `.mb-input__field`'s actual content-box height
// (0.5rem padding + 1.5 line-height at the 1rem body size = 40px) directly via `minHeight` instead
// — a hard layout constraint every platform honors the same way, regardless of text metrics.
const triggerStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 40,
};

/**
 * A tap-to-open dropdown: the trigger looks like an Input field, tapping it opens a Modal listing
 * every option (with an optional search filter for long lists, e.g. countries). Native has no
 * good inline `<select>` equivalent across iOS/Android, so this is a full-screen picker instead.
 */
export function Select<T extends string>({
  value,
  options,
  onChange,
  placeholder = "Select…",
  title,
  searchable = false,
  disabled = false,
  className,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedLabel = options.find((option) => option.value === value)?.label ?? null;

  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const normalized = query.trim().toLowerCase();
    return options.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [options, query, searchable]);

  const rootClassName = ["mb-input", disabled && "mb-input--disabled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <Pressable
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        style={[withClassName(rootClassName) as ViewStyle, triggerStyle]}
      >
        <Text color={selectedLabel ? "text" : "textMuted"}>
          {selectedLabel ?? placeholder}
        </Text>
        <Icon icon={ChevronDown} color="textMuted" size={18} />
      </Pressable>

      <Modal
        visible={open}
        onClose={() => {
          setOpen(false);
          setQuery("");
        }}
        title={title ?? placeholder}
        scrollable={false}
      >
        {searchable ? (
          <Input value={query} onChangeText={setQuery} placeholder="Search…" autoFocus />
        ) : null}

        <FlatList
          data={filteredOptions}
          keyExtractor={(option) => option.value}
          style={{ maxHeight: 360 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                onChange(item.value);
                setOpen(false);
                setQuery("");
              }}
              style={rowStyle}
            >
              <Text weight={item.value === value ? "bold" : "regular"}>{item.label}</Text>
              {item.value === value ? <Icon icon={Check} color="primary" size={18} /> : null}
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={{ paddingVertical: 24, alignItems: "center" }}>
              <Text color="textMuted">No matches</Text>
            </View>
          }
        />
      </Modal>
    </>
  );
}
