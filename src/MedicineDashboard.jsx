import { useEffect, useRef, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Highcharts from 'highcharts'
import HighchartsReactModule from 'highcharts-react-official'

const HighchartsReact = HighchartsReactModule.HighchartsReact

const chartStyle = {
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  fontSize: '13px',
}

const getDashboardChartOptions = (medicineData) => {
const lineChartOptions = {
  chart: { type: 'line', styledMode: false, height: 420, marginTop: 35 },
  title: { text: null },
  credits: { enabled: false },
  exporting: { enabled: false },
  xAxis: { categories: medicineData.monthlyUsage.map((item) => item.month), lineWidth: 0, gridLine: { visible: false } },
  yAxis: { min: 0, title: { text: 'Monthly activity', style: { color: '#64748b', fontSize: '12px' } }, gridLine: { lineWidth: 1, stroke: '#e2e8f0' } },
  series: [
    { name: 'Prescriptions', data: medicineData.monthlyUsage.map((item) => item.prescriptions), color: '#2563eb', lineWidth: 3, marker: { enabled: true, radius: 5 } },
    { name: 'Patients', data: medicineData.monthlyUsage.map((item) => item.patients), color: '#8b5cf6', lineWidth: 3, marker: { enabled: true, radius: 5 } },
    { name: 'Inpatient visits', data: medicineData.monthlyUsage.map((item) => item.inpatientVisits), color: '#f59e0b', lineWidth: 3, marker: { enabled: true, radius: 5 } },
  ],
  tooltip: { shared: true, valueFormat: '{point.y}' },
  plotOptions: { line: { animation: { duration: 900 } } },
  style: chartStyle,
}

const pieChartOptions = {
  chart: { type: 'pie', styledMode: false, height: 340, margin: [8, 8, 8, 8], spacing: 0 },
  title: { text: null },
  credits: { enabled: false },
  exporting: { enabled: false },
  plotOptions: {
    pie: {
      size: 210,
      center: ['50%', '50%'],
      dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y} units' },
    },
  },
  series: [{ type: 'pie', name: 'Available stock', data: medicineData.medicineStock.map((item) => ({ name: item.name, y: item.availableUnits })) }],
  tooltip: { point: { format: '<b>{point.name}</b>: {point.y} units' } },
  style: chartStyle,
}

const donutChartOptions = {
  chart: { type: 'pie', styledMode: false, height: 340, margin: [8, 8, 8, 8], spacing: 0 },
  title: { text: null },
  credits: { enabled: false },
  exporting: { enabled: false },
  plotOptions: {
    pie: {
      size: 190,
      innerSize: 92,
      startAngle: 90,
      endAngle: 450,
      center: ['50%', '50%'],
      dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y} units' },
    },
  },
  series: [{ type: 'pie', name: 'Stock mix', data: medicineData.medicineStock.map((item) => ({ name: item.name, y: item.availableUnits })) }],
  colors: ['#2563eb', '#7c3aed', '#10b981', '#f59e0b'],
  tooltip: { point: { format: '<b>{point.name}</b>: {point.y} units' } },
  style: chartStyle,
}

const columnChartOptions = {
  chart: { type: 'column', styledMode: false, height: 420, marginTop: 35 },
  title: { text: null },
  credits: { enabled: false },
  exporting: { enabled: false },
  xAxis: { categories: medicineData.weeklyDemand.map((item) => item.day), lineWidth: 0, gridLine: { visible: false } },
  yAxis: { min: 0, title: { text: 'Units sold', style: { color: '#64748b', fontSize: '12px' } }, gridLine: { lineWidth: 1, stroke: '#e2e8f0' } },
  series: [
    { name: 'Actual units', data: medicineData.weeklyDemand.map((item) => item.units), color: '#0ea5e9', borderRadius: 7 },
    { name: 'Target units', data: medicineData.weeklyDemand.map((item) => item.target), color: '#94a3b8', borderRadius: 7 },
  ],
  tooltip: { shared: true, valuePrefix: 'Units: ' },
  style: chartStyle,
}

const areaChartOptions = {
  chart: { type: 'areaspline', styledMode: false, height: 420, marginTop: 35 },
  title: { text: null },
  credits: { enabled: false },
  exporting: { enabled: false },
  xAxis: { categories: medicineData.categoryRevenue.map((item) => item.name), lineWidth: 0, gridLine: { visible: false } },
  yAxis: { min: 0, title: { text: 'Revenue (%)', style: { color: '#64748b', fontSize: '12px' } }, gridLine: { lineWidth: 1, stroke: '#e2e8f0' } },
  series: [
    { name: 'Actual revenue', data: medicineData.categoryRevenue.map((item) => item.revenue), color: '#10b981', fillOpacity: 0.22, fillColor: '#10b981', lineWidth: 2 },
    { name: 'Target revenue', data: medicineData.categoryRevenue.map((item) => item.target), color: '#f59e0b', lineWidth: 2 },
  ],
  tooltip: { shared: true, valueSuffix: '%' },
  style: chartStyle,
}

const barChartOptions = {
  chart: { type: 'bar', styledMode: false, height: 420, marginTop: 35 },
  title: { text: null },
  credits: { enabled: false },
  exporting: { enabled: false },
  xAxis: {
    categories: medicineData.medicineStock.map((item) => item.name),
    title: { text: 'Medicine', style: { color: '#64748b', fontSize: '12px' } },
    lineWidth: 0,
    gridLine: { visible: false },
  },
  yAxis: {
    min: 0,
    title: { text: 'Units', style: { color: '#64748b', fontSize: '12px' } },
    gridLine: { lineWidth: 1, stroke: '#e2e8f0' },
  },
  series: [
    { name: 'Available', data: medicineData.medicineStock.map((item) => item.availableUnits), color: '#2563eb' },
    { name: 'Reserved', data: medicineData.medicineStock.map((item) => item.reservedUnits), color: '#94a3b8' },
  ],
  tooltip: { shared: true, valuePrefix: 'Units: ' },
  style: chartStyle,
}

const scatterChartOptions = {
  chart: { type: 'scatter', styledMode: false, height: 420, marginTop: 35 },
  title: { text: null },
  credits: { enabled: false },
  exporting: { enabled: false },
  xAxis: {
    title: { text: 'Units sold', style: { color: '#64748b', fontSize: '12px' } },
    min: 0,
    gridLine: { lineWidth: 1, stroke: '#e2e8f0' },
  },
  yAxis: {
    title: { text: 'Growth (%)', style: { color: '#64748b', fontSize: '12px' } },
    min: 0,
    gridLine: { lineWidth: 1, stroke: '#e2e8f0' },
  },
  series: [{
    name: 'Regional performance',
    data: medicineData.regionalPerformance.map((item) => ({
      name: item.region,
      x: item.units,
      y: item.growth,
    })),
    color: '#8b5cf6',
    marker: { enabled: true, radius: 8, fillOpacity: 0.8 },
    dataLabels: {
      enabled: true,
      format: '<b>{point.name}</b>',
      verticalPosition: 'bottom',
    },
  }],
  tooltip: {
    point: {
      format: '<b>{point.name}</b><br/>Units: {point.x}<br/>Growth: {point.y}%',
    },
  },
  style: chartStyle,
}

  return {
    lineChartOptions,
    pieChartOptions,
    donutChartOptions,
    columnChartOptions,
    areaChartOptions,
    barChartOptions,
    scatterChartOptions,
  }
}

const ChartCard = ({ title, subtitle, badge, children, className = '' }) => (
  <section className={`overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none ${className}`}>
    <div className="mb-4 flex items-start justify-between gap-4">
      <div><h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">{title}</h2><p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{subtitle}</p></div>
      {badge && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">{badge}</span>}
    </div>
    {children}
  </section>
)

const chartTheme = {
  light: {
    backgroundColor: '#ffffff',
    plotBackgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    textColor: '#0f172a',
    axisColor: '#64748b',
    gridColor: '#e2e8f0',
  },
  dark: {
    backgroundColor: '#1e293b',
    plotBackgroundColor: '#1e293b',
    borderColor: '#475569',
    textColor: '#e2e8f0',
    axisColor: '#94a3b8',
    gridColor: '#334155',
  },
}

const getChartOptions = (options, theme) => {
  const palette = chartTheme[theme] || chartTheme.light
  const xAxis = options.xAxis ? {
    ...options.xAxis,
    labels: { ...options.xAxis.labels, style: { color: palette.axisColor } },
    title: options.xAxis.title
      ? { ...options.xAxis.title, style: { ...options.xAxis.title.style, color: palette.textColor } }
      : options.xAxis.title,
  } : undefined

  const yAxis = options.yAxis ? {
    ...options.yAxis,
    labels: { ...options.yAxis.labels, style: { color: palette.axisColor } },
    title: options.yAxis.title
      ? { ...options.yAxis.title, style: { ...options.yAxis.title.style, color: palette.textColor } }
      : options.yAxis.title,
    gridLine: { ...options.yAxis.gridLine, stroke: palette.gridColor },
  } : undefined

  const plotOptions = options.plotOptions
    ? {
        ...options.plotOptions,
        pie: options.plotOptions.pie
          ? {
              ...options.plotOptions.pie,
              dataLabels: {
                ...options.plotOptions.pie.dataLabels,
                style: { color: palette.textColor },
              },
            }
          : options.plotOptions.pie,
      }
    : options.plotOptions
  const series = options.series?.map((item) => item.dataLabels
    ? {
        ...item,
        dataLabels: {
          ...item.dataLabels,
          style: { ...item.dataLabels.style, color: palette.textColor },
        },
      }
    : item)

  return {
    ...options,
    chart: {
      ...options.chart,
      backgroundColor: palette.backgroundColor,
      plotBackgroundColor: palette.plotBackgroundColor,
      borderColor: palette.borderColor,
    },
    ...(xAxis ? { xAxis } : {}),
    ...(yAxis ? { yAxis } : {}),
    ...(plotOptions ? { plotOptions } : {}),
    ...(series ? { series } : {}),
    legend: {
      ...options.legend,
      itemStyle: { ...options.legend?.itemStyle, color: palette.textColor },
      itemHoverStyle: { ...options.legend?.itemHoverStyle, color: palette.textColor },
      itemHiddenStyle: { ...options.legend?.itemHiddenStyle, color: palette.axisColor },
    },
    tooltip: {
      ...options.tooltip,
      backgroundColor: palette.backgroundColor,
      borderColor: palette.borderColor,
      style: { color: palette.textColor },
    },
  }
}

function MedicineDashboard() {
  const { user, isAuthenticated, isLoading, loginWithPopup, logout } = useAuth0()
  const [medicineData, setMedicineData] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [dataError, setDataError] = useState('')
  const [dataLoadAttempt, setDataLoadAttempt] = useState(0)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('medicine-theme')
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginPending, setLoginPending] = useState(false)
  const [loginError, setLoginError] = useState('')
  const userMenuRef = useRef(null)
  const displayName = user?.name || user?.email || 'Account'
  const chartOptions = medicineData ? getDashboardChartOptions(medicineData) : null

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/medicine-data', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Medicine data request failed (${response.status}).`)
        }
        return response.json()
      })
      .then((data) => setMedicineData(data))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setDataError(error instanceof Error ? error.message : 'Unable to load medicine data.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setDataLoading(false)
      })

    return () => controller.abort()
  }, [dataLoadAttempt])

  const startAuth0Login = async () => {
    setLoginError('')
    setLoginPending(true)
    try {
      await loginWithPopup()
      setLoginModalOpen(false)
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Unable to complete sign in.')
    } finally {
      setLoginPending(false)
    }
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('medicine-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  useEffect(() => {
    if (!loginModalOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') setLoginModalOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [loginModalOpen])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors dark:bg-slate-800 dark:text-slate-100">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 px-5 py-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/95 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="Medicine analytics logo" className="h-10 w-10 rounded-xl object-contain" />
            <div><p className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">Clarivate</p><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500">Medicine analytics</p></div>
          </div>
          <div ref={userMenuRef} className="relative flex items-center gap-2">
            <button type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400">
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            {isAuthenticated ? (
              <>
                <button type="button" aria-haspopup="menu" aria-expanded={userMenuOpen} onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400">
                  <img
                    src={user?.picture || '/default-avatar.svg'}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = '/default-avatar.svg'
                    }}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  {displayName}
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform" style={{ transform: userMenuOpen ? 'rotate(180deg)' : undefined }}>
                    <path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div role="menu" className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                    <div className="border-b border-slate-100 px-3 py-2 dark:border-slate-800"><p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">{displayName}</p><p className="mt-0.5 truncate text-[10px] text-slate-400">{user?.email}</p></div>
                    <button type="button" role="menuitem" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10">Sign out</button>
                  </div>
                )}
              </>
            ) : (
              <button type="button" disabled={isLoading} onClick={() => { setLoginError(''); setLoginModalOpen(true) }} className="h-9 rounded-xl bg-blue-700 px-4 text-xs font-semibold text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-70">
                {isLoading ? 'Checking...' : 'Sign in / Sign up'}
              </button>
            )}
          </div>
        </div>
      </header>

      {loginModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-5 py-6">
          <button type="button" aria-label="Close sign-in dialog" onClick={() => setLoginModalOpen(false)} className="absolute inset-0 cursor-default bg-slate-950/55" />
          <section role="dialog" aria-modal="true" aria-labelledby="login-dialog-title" className="relative z-10 w-full max-w-md border-t-4 border-blue-700 bg-white p-7 text-slate-800 shadow-2xl dark:bg-slate-900 dark:text-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-blue-700 dark:text-blue-400">Clarivate</p>
                <h2 id="login-dialog-title" className="mt-2 text-xl font-bold">Sign in or create an account</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Use your organization account to access the dashboard.</p>
              </div>
              <button type="button" onClick={() => setLoginModalOpen(false)} className="rounded-md px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">Close</button>
            </div>
            {loginError && <p role="alert" className="mt-4 text-sm text-rose-600">{loginError}</p>}
            {loginPending && <p role="status" className="mt-4 text-sm text-slate-500 dark:text-slate-400">Complete sign-in in the Auth0 popup window.</p>}
            <button type="button" disabled={loginPending} onClick={startAuth0Login} className="mt-6 w-full rounded-md bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-70">
              {loginPending ? 'Waiting for Auth0...' : 'Continue with Auth0'}
            </button>
          </section>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-5 pt-24 pb-7 sm:px-8">
        {dataLoading && !medicineData ? (
          <p role="status" className="py-16 text-center text-sm text-slate-500 dark:text-slate-400">Loading medicine dashboard…</p>
        ) : dataError && !medicineData ? (
          <section className="mx-auto max-w-lg border-l-4 border-rose-500 bg-white p-6 shadow-sm dark:bg-slate-900">
            <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">{dataError}</p>
            <button
              type="button"
              onClick={() => {
                setDataError('')
                setDataLoading(true)
                setDataLoadAttempt((attempt) => attempt + 1)
              }}
              className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800"
            >
              Retry
            </button>
          </section>
        ) : medicineData && chartOptions ? (
          <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">Overview</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Medicine dashboard</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A simple view of dummy drug usage and inventory data.</p></div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Prescription trend" subtitle="Monthly prescriptions and patients" badge="Line chart" className="min-h-[480px]">
            <div className="h-[420px] w-full"><HighchartsReact allowChartUpdate highcharts={Highcharts} options={getChartOptions(chartOptions.lineChartOptions, theme)} /></div>
          </ChartCard>

          <ChartCard title="Medicine stock" subtitle="Current inventory by medicine" badge="Pie chart" className="min-h-[500px]">
            <div className="flex h-[480px] flex-col items-center gap-3">
              <div className="h-[340px] w-full"><HighchartsReact allowChartUpdate highcharts={Highcharts} options={getChartOptions(chartOptions.pieChartOptions, theme)} /></div>
              <div className="grid w-full grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-4">
                {medicineData.medicineStock.map((item) => (
                  <div key={item.name} className="min-w-0 rounded-lg bg-slate-50 px-2.5 py-2 text-center dark:bg-slate-800/70">
                    <p className="truncate text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.name}</p>
                    <p className="mt-1 text-[11px] font-bold text-slate-800 dark:text-slate-200">{item.availableUnits} available</p>
                    <p className="mt-0.5 text-[9px] text-slate-400">{item.reservedUnits} reserved · {item.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Weekly medicine demand" subtitle="Units sold every weekday" badge="Column chart" className="min-h-[480px]">
            <div className="h-[420px] w-full"><HighchartsReact allowChartUpdate highcharts={Highcharts} options={getChartOptions(chartOptions.columnChartOptions, theme)} /></div>
          </ChartCard>

          <ChartCard title="Medicine stock mix" subtitle="Share of available medicine stock" badge="Donut chart" className="min-h-[500px]">
            <div className="flex h-[480px] flex-col items-center gap-3">
              <div className="h-[340px] w-full"><HighchartsReact allowChartUpdate highcharts={Highcharts} options={getChartOptions(chartOptions.donutChartOptions, theme)} /></div>
              <div className="grid w-full grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-4">
                {medicineData.medicineStock.map((item) => (
                  <div key={item.name} className="min-w-0 rounded-lg bg-slate-50 px-2.5 py-2 text-center dark:bg-slate-800/70">
                    <p className="truncate text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.name}</p>
                    <p className="mt-1 text-[11px] font-bold text-slate-800 dark:text-slate-200">{item.availableUnits} available</p>
                    <p className="mt-0.5 text-[9px] text-slate-400">{item.reservedUnits} reserved · {item.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Revenue by category" subtitle="Percentage share of medicine revenue" badge="Area chart" className="min-h-[480px] lg:col-span-2">
            <div className="h-[420px] w-full"><HighchartsReact allowChartUpdate highcharts={Highcharts} options={getChartOptions(chartOptions.areaChartOptions, theme)} /></div>
          </ChartCard>

          <ChartCard title="Medicine stock comparison" subtitle="Available and reserved units by medicine" badge="Bar chart" className="min-h-[480px]">
            <div className="h-[420px] w-full"><HighchartsReact allowChartUpdate highcharts={Highcharts} options={getChartOptions(chartOptions.barChartOptions, theme)} /></div>
          </ChartCard>

          <ChartCard title="Regional performance" subtitle="Units sold versus growth rate" badge="Scatter chart" className="min-h-[480px]">
            <div className="h-[420px] w-full"><HighchartsReact allowChartUpdate highcharts={Highcharts} options={getChartOptions(chartOptions.scatterChartOptions, theme)} /></div>
          </ChartCard>
            </div>
          </>
        ) : null}
      </main>
    </div>
  )
}

export default MedicineDashboard
