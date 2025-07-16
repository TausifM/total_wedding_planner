// components/Card.tsx
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  image: any;
  title: string;
  price: string;
  meta?: string;
  onPress?: () => void;
}

export default function Card({ image, title, price, meta, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardPrice}>{price}</Text>
      {meta && <Text style={styles.cardMeta}>{meta}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    padding: 10,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    color: '#333',
  },
  cardPrice: {
    fontSize: 13,
    color: '#666',
  },
  cardMeta: {
    fontSize: 12,
    color: '#999',
  },
});
