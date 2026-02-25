// useArticles – composable for article data fetching
import type { Article } from '~/types'

const STATIC_ARTICLES: Article[] = [
  {
      id: '1',
      title: 'Tips dan Trik Agar Perjalanan Jarak Jauh dengan Bus Lebih Nyaman',
      slug: 'tips-trik-perjalanan-nyaman',
      excerpt: 'Perjalanan jarak jauh bisa terasa melelahkan jika tidak dipersiapkan dengan baik. Melalui artikel ini, kami berbagi tips sederhana mulai dari memilih kursi yang tepat agar istirahat selama di perjalanan lebih maksimal.',
      content: 'Perjalanan jarak jauh kini bukan lagi hal yang melelahkan. Dengan hadirnya Sleeper Bus New Shantika, Anda bisa menikmati pengalaman perjalanan yang nyaman, aman, dan menyenangkan. Lalu, apa yang membuat bus ini menjadi pilihan terbaik bagi para traveler?\n\n1. Kenyamanan Maksimal di Setiap Perjalanan\nSleeper Bus New Shantika dirancang untuk memberikan kenyamanan ekstra. Setiap kursi dapat direbahkan hingga 170 derajat, dilengkapi dengan bantal, selimut, dan colokan USB. Dengan fasilitas ini, Anda bisa beristirahat layaknya di kamar sendiri selama perjalanan.\n\n2. Fasilitas Lengkap untuk Menemani Anda\nKami memahami kebutuhan penumpang dalam perjalanan panjang. Karena itu, bus ini dilengkapi dengan AC yang sejuk, toilet bersih, layanan snack, dan layar hiburan di setiap kursi. Tidak hanya nyaman, tetapi juga menghibur sepanjang jalan.\n\n3. Keselamatan Selalu Menjadi Prioritas\nNew Shantika selalu mengutamakan keselamatan penumpang. Armada kami dilengkapi with perlengkapan keselamatan seperti alat pemadam api ringan (APAR), palu pemecah kaca, and pintu darurat. Selain itu, setiap pengemudi telah berpengalaman and melalui pelatihan keselamatan berkendara.',
      thumbnail: '/images/video.png',
      author: 'Admin',
      publishedAt: '1 September 2025',
      category: 'Tips & Trik',
      readingTime: '9 Menit'
  },
  {
      id: '2',
      title: 'Kenali Keunggulan Armada Bus Shantika Modern',
      slug: 'keunggulan-armada-shantika',
      excerpt: 'Armada Shantika dirancang untuk memberikan pengalaman perjalanan terbaik bagi penumpang. Dengan fasilitas modern, kursi yang ergonomis, and sistem hiburan premium yang siap menemani setiap detik perjalanan Anda.',
      content: 'Armada Shantika dirancang untuk memberikan pengalaman perjalanan terbaik bagi penumpang. Dengan fasilitas modern, interior nyaman, serta standar keamanan tinggi, setiap unit bus kami siap mendukung perjalanan Anda, baik untuk rute antar kota maupun jarak dekat.',
      thumbnail: '/images/member.png',
      author: 'Admin',
      publishedAt: '1 September 2025',
      category: 'Armada',
      readingTime: '7 Menit'
  },
  {
      id: '3',
      title: 'Rute Perjalanan Populer yang Sering Dipilih Penumpang Bus Shantika',
      slug: 'rute-perjalanan-populer',
      excerpt: 'Shantika melayani berbagai rute favorit yang menghubungkan kota-kota besar di Jawa. Cari tahu rute mana saja yang paling banyak diminati oleh penumpang setia kami tahun ini.',
      content: 'Shantika melayani berbagai rute favorit yang menghubungkan kota-kota besar di Jawa. Artikel ini akan membantu Anda menemukan jalur yang sesuai dengan kebutuhan, mulai dari perjalanan bisnis hingga liburan, agar mobilitas Anda semakin praktis and efisien.',
      thumbnail: '/images/video.png',
      author: 'Admin',
      publishedAt: '1 September 2025',
      category: 'Rute',
      readingTime: '5 Menit'
  }
]

export const useArticles = () => {
  const articles = ref<Article[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchArticles = async () => {
    loading.value = true
    try {
      articles.value = STATIC_ARTICLES
    } catch (e) {
      error.value = 'Gagal memuat artikel'
    } finally {
      loading.value = false
    }
  }

  const fetchArticleById = async (id: string): Promise<Article | null> => {
    loading.value = true
    try {
      if (articles.value.length === 0) {
          articles.value = STATIC_ARTICLES
      }
      return articles.value.find(a => a.id === id) || null
    } catch {
      return null
    } finally {
      loading.value = false
    }
  }

  return { articles, loading, error, fetchArticles, fetchArticleById }
}
