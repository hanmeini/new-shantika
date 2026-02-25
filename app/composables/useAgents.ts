import type { Agent } from '~/types'

const STATIC_AGENTS = [
    {
        id: '1',
        name: 'Agen Semarang',
        city: 'Semarang',
        address: 'Jl. Tanggul Mas Tim. Raya No.138, Panggung Lor, Kec. Semarang Utara, Kota Semarang, Jawa Tengah 50176',
        phone: '17465389207',
        operationalHours: '08:00 - 20:00',
        thumbnail: '/images/video.png'
    },
    {
        id: '2',
        name: 'Agen Jakarta (Kalideres)',
        city: 'Jakarta',
        address: 'Terminal Bus Kalideres, RT.4/RW.1, Kalideres, Kec. Kalideres, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11840',
        phone: '081234567890',
        operationalHours: '07:00 - 21:00',
        thumbnail: '/images/member.png'
    },
    {
        id: '3',
        name: 'Agen Solo (Kartasura)',
        city: 'Solo',
        address: 'Jl. Raya Solo-Semarang No.10, Kartasura, Kabupaten Sukoharjo, Jawa Tengah 57167',
        phone: '081223344556',
        operationalHours: '08:00 - 19:00',
        thumbnail: '/images/video.png'
    },
    {
        id: '4',
        name: 'Agen Kudus',
        city: 'Kudus',
        address: 'Terminal Induk Kudus, Jati Wetan, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59346',
        phone: '085678901234',
        operationalHours: '08:00 - 20:00',
        thumbnail: '/images/member.png'
    },
    {
        id: '5',
        name: 'Agen Jepara',
        city: 'Jepara',
        address: 'Ngabul, Kec. Tahunan, Kabupaten Jepara, Jawa Tengah 59427',
        phone: '081234432112',
        operationalHours: '07:30 - 18:30',
        thumbnail: '/images/video.png'
    },
    {
        id: '6',
        name: 'Agen Yogyakarta (Jombor)',
        city: 'Yogyakarta',
        address: 'Terminal Jombor, Sinduadi, Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284',
        phone: '081398765432',
        operationalHours: '08:00 - 21:00',
        thumbnail: '/images/member.png'
    },
    {
        id: '7',
        name: 'Agen Cirebon',
        city: 'Cirebon',
        address: 'Terminal Harjamukti, Kec. Harjamukti, Kota Cirebon, Jawa Barat 45143',
        phone: '081288776655',
        operationalHours: '08:00 - 19:00',
        thumbnail: '/images/video.png'
    },
    {
        id: '8',
        name: 'Agen Surabaya',
        city: 'Surabaya',
        address: 'Terminal Purabaya, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256',
        phone: '081255443322',
        operationalHours: '24 Jam',
        thumbnail: '/images/member.png'
    },
    {
        id: '9',
        name: 'Agen Pekalongan',
        city: 'Pekalongan',
        address: 'Terminal Bus Pekalongan, Kec. Pekalongan Barat, Kota Pekalongan, Jawa Tengah 51111',
        phone: '085811223344',
        operationalHours: '08:00 - 20:00',
        thumbnail: '/images/video.png'
    }
]

export const useAgents = () => {
    const agents = ref<Agent[]>([])
    const loading = ref(false)

    const fetchAgents = async () => {
        loading.value = true
        try {
            agents.value = STATIC_AGENTS
            return agents.value
        } finally {
            loading.value = false
        }
    }

    const searchAgents = (query: string, city: string) => {
        return agents.value.filter(agent => {
            const matchesQuery = agent.name.toLowerCase().includes(query.toLowerCase()) || 
                                agent.address.toLowerCase().includes(query.toLowerCase())
            const matchesCity = city === '' || agent.city === city
            return matchesQuery && matchesCity
        })
    }

    const getCities = () => {
        return Array.from(new Set(STATIC_AGENTS.map(a => a.city))).sort()
    }

    return {
        agents,
        loading,
        fetchAgents,
        searchAgents,
        getCities
    }
}
