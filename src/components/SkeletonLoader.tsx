import React from 'react';
import { View } from 'react-native';
import styles from '../styles/homestyles';

type SkeletonLoaderProps = {
  variant: 'summary' | 'actions' | 'market-activity' | 'user-card' | 'explore-card' | 'home';
};

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant }) => {
  switch (variant) {
    case 'home':
      return (
        <View style={{ gap: 16 }}> 
          <View style={styles.skeletonSummaryCard}>
            <View style={[styles.skeletonLine, { width: '60%', height: 32, marginBottom: 8 }]} />
            <View style={[styles.skeletonLine, { width: '40%', height: 16 }]} />
            <View style={styles.skeletonGraphContainer}>
              <View style={styles.skeletonGraphLine} />
            </View>
            <View style={styles.skeletonFilters}>
              {['1W', '1M', '1Y', 'ALL'].map((_, i) => (
                <View key={`filter-${i}`} style={styles.skeletonFilterButton} />
              ))}
            </View>
          </View>

          <View style={styles.skeletonActions}>
            {['Earn', 'Buy', 'Send', 'Receive'].map((_, i) => (
            <View key={`action-${i}`} style={styles.skeletonActionButton} />
            ))}
          </View>

          <View style={styles.skeletonMarketActivity}>
            <View style={styles.skeletonMarketHeader}>
              <View style={[styles.skeletonLine, { width: 100, height: 20 }]} />
              <View style={styles.skeletonTradeButton} />
            </View>
            <View style={[styles.skeletonLine, { width: '30%', height: 28, marginBottom: 8 }]} />
            <View style={[styles.skeletonLine, { width: '40%', height: 16, marginBottom: 12 }]} />
            <View style={[styles.skeletonLine, { width: '20%', height: 14 }]} />
            <View style={styles.skeletonDivider} />
            <View style={styles.skeletonBuyersSellers}>
              <View style={[styles.skeletonBuyerBar, { width: '26%' }]} />
              <View style={[styles.skeletonSellerBar, { width: '74%' }]} />
            </View>
          </View>

          <View style={styles.skeletonUserCard}>
            <View style={styles.skeletonAvatar} />
            <View style={styles.skeletonTextBlock}>
              <View style={[styles.skeletonLine, { width: '60%' }]} />
              <View style={[styles.skeletonLine, { width: '40%' }]} />
            </View>
          </View>

          <View style={styles.skeletonExploreGrid}>
            {[...Array(4)].map((_, i) => (
              <View key={i} style={styles.skeletonExploreCard} />
            ))}
          </View>
        </View>
      );

      case 'summary':
      return (
        <View style={styles.skeletonSummaryCard}>
          <View style={[styles.skeletonLine, { width: '60%', height: 32, marginBottom: 8 }]} />
          <View style={[styles.skeletonLine, { width: '40%', height: 16 }]} />
          <View style={styles.skeletonGraphContainer}>
            <View style={styles.skeletonGraphLine} />
          </View>
          <View style={styles.skeletonFilters}>
            {['1W', '1M', '1Y', 'ALL'].map((_, i) => (
              <View key={`filter-${i}`} style={styles.skeletonFilterButton} />
            ))}
          </View>
        </View>
      );

    case 'actions':
      return (
        <View style={styles.skeletonActions}>
          {['Earn', 'Buy', 'Send', 'Receive'].map((_, i) => (
            <View key={`action-${i}`} style={styles.skeletonActionButton} />
          ))}
        </View>
      );

    case 'market-activity':
      return (
        <View style={styles.skeletonMarketActivity}>
          <View style={styles.skeletonMarketHeader}>
            <View style={[styles.skeletonLine, { width: 100, height: 20 }]} />
            <View style={styles.skeletonTradeButton} />
          </View>
          <View style={[styles.skeletonLine, { width: '30%', height: 28, marginBottom: 8 }]} />
          <View style={[styles.skeletonLine, { width: '40%', height: 16, marginBottom: 12 }]} />
          <View style={[styles.skeletonLine, { width: '20%', height: 14 }]} />
          <View style={styles.skeletonDivider} />
          <View style={styles.skeletonBuyersSellers}>
            <View style={[styles.skeletonBuyerBar, { width: '26%' }]} />
            <View style={[styles.skeletonSellerBar, { width: '74%' }]} />
          </View>
        </View>
      );

    case 'user-card':
      return (
        <View style={styles.skeletonUserCard}>
          <View style={styles.skeletonAvatar} />
          <View style={styles.skeletonTextBlock}>
            <View style={[styles.skeletonLine, { width: '60%' }]} />
            <View style={[styles.skeletonLine, { width: '40%' }]} />
          </View>
        </View>
      );

    case 'explore-card':
      return (
        
        <View style={styles.skeletonExploreGrid}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={styles.skeletonExploreCard} />
          ))}
        </View>
      );

    default:
      return null;
  }
};
