import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LazyImage from '../../components/LazyImage';
import colors from '../../styles/colors';

interface Post {
  id: number;
  image: string;
  description: string;
  aspectRatio: number;
  small: string;
  author: {
    avatar: string;
    name: string;
  };
}

const Home: React.FC = () => {
  const [feed, setFeed] = useState<Post[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState<any[]>([]);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async (page = pageNumber, shouldRefresh = false) => {
    const itemsPerPage = 5;

    if (totalPages && page > totalPages) return;

    setLoading(true);

    const response = await fetch(
      `http://10.0.2.2:3000/feed?_expand=author&_limit=${itemsPerPage}&_page=${page}`
    );

    const data: Post[] = await response.json();
    const totalItems = response.headers.get('X-Total-Count');

    setTotalPages(Math.floor(Number(totalItems) / itemsPerPage));
    setFeed(shouldRefresh ? data : [...feed, ...data]);
    setPageNumber(page + 1);

    setLoading(false);
  };

  const refreshList = async () => {
    setRefreshing(true);
    await loadPage(1, true);
    setRefreshing(false);
  };

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }: any) => item.id));
  }, []);

  return (
    <View style={styles.Container}>
      <FlatList
        data={feed}
        keyExtractor={(post) => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size={'small'}
              color={colors.gray}
              style={styles.Loading}
            />
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.Post}>
            <View style={styles.PostHeader}>
              <Image
                style={styles.PostAvatar}
                source={{ uri: item.author.avatar || '' }}
              />
              <Text style={styles.PostAuthorName}>{item.author.name}</Text>
            </View>

            <LazyImage
              shouldLoad={viewable.includes(item.id)}
              aspectRatio={item.aspectRatio}
              smallSource={item.small}
              source={item.image}
            />

            <View style={styles.PostDescription}>
              <Text style={styles.PostAuthorName}>{item.author.name}</Text>
              <Text style={styles.PostDescriptionText}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  Post: {
    marginTop: 10,
  },

  PostHeader: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  PostAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },

  PostAuthorName: {
    color: colors.gray,
    fontWeight: 'bold',
  },

  PostDescription: {},
  PostDescriptionText: {},

  Loading: {
    marginVertical: 30,
  },
});

export default Home;
